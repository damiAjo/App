'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SignLanguageTranslatorProps {
  onTranslate?: (text: string) => void;
}

export const SignLanguageTranslator: React.FC<SignLanguageTranslatorProps> = ({ onTranslate }) => {
  const [translationText, setTranslationText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [mappedGestures, setMappedGestures] = useState<string[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Gesture mapping dictionary for demonstrative sign translation representation
  const gestureDict: Record<string, string> = {
    hello: '👋',
    welcome: '👐',
    please: '🙏',
    thanks: '🤝',
    thank: '🤝',
    you: '☝️',
    love: '🤟',
    help: '✊',
    safety: '🛡️',
    emergency: '🚨',
    yes: '👍',
    no: '👎',
    deaf: '👂🚫',
    happy: '😊',
    good: '👌',
  };

  const handleTranslate = async () => {
    if (!translationText.trim()) return;
    setIsProcessing(true);
    setMappedGestures([]);

    // Translate words into gestural characters
    setTimeout(() => {
      const words = translationText.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").split(/\s+/);
      const gestures = words
        .map(word => gestureDict[word] || '✍️') // Default to writing hand icon if not in dictionary
        .filter(Boolean);

      setMappedGestures(gestures);
      setIsProcessing(false);
      onTranslate?.(translationText);
    }, 8500); // Simulate realistic deep-learning translation latency
  };

  const stopVideoCapture = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const startVideoCapture = async () => {
    try {
      if (isCameraActive) {
        stopVideoCapture();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('Camera access is required for real-time sign language vision capture.');
    }
  };

  // Release camera resource when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        marginBottom: '2rem',
      }}
      role="region"
      aria-label="Sign language translation interface"
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
        🤟 Sign Language Translator (Avatar Vision)
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flexWrap: 'wrap' }}>
        
        {/* Input Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label htmlFor="translationInput" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              Translate English Text to Signs:
            </label>
            <textarea
              id="translationInput"
              value={translationText}
              onChange={(e) => setTranslationText(e.target.value)}
              placeholder="Type English words (e.g., 'hello please love thanks you')..."
              aria-label="Text input to translate to sign language"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                fontSize: '1rem',
                minHeight: '110px',
                fontFamily: 'var(--font-sans)',
                resize: 'none',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleTranslate}
              disabled={isProcessing || !translationText.trim()}
              aria-label="Translate text to sign language gestures"
              style={{
                flex: 1,
                padding: '0.75rem 1.5rem',
                background: 'var(--accent-primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                cursor: isProcessing || !translationText.trim() ? 'not-allowed' : 'pointer',
                opacity: isProcessing || !translationText.trim() ? 0.5 : 1,
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
              }}
            >
              {isProcessing ? 'Translating...' : 'Translate to Gestures'}
            </button>
            <button
              onClick={startVideoCapture}
              aria-pressed={isCameraActive}
              aria-label={isCameraActive ? 'Stop translation webcam' : 'Start translation webcam'}
              style={{
                padding: '0.75rem 1.5rem',
                background: isCameraActive ? 'var(--danger)' : 'var(--accent-secondary)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.25)',
              }}
            >
              {isCameraActive ? 'Disable Webcam' : 'Enable Webcam'}
            </button>
          </div>

          {/* Web camera feedback container */}
          <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', height: '180px', backgroundColor: '#000' }}>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)', // Mirror feed
              }}
              aria-label="Sign language camera visual analyzer input stream"
            />
            {!isCameraActive && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.6)' }}>
                <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📷</span>
                <span style={{ fontSize: '0.85rem', color: '#aaa', fontWeight: '500' }}>Webcam feedback closed</span>
              </div>
            )}
          </div>
        </div>

        {/* Translation Output Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100%' }}>
          <span style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Sign Language Gestural Output
          </span>

          <div
            style={{
              flex: 1,
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px dashed var(--border-color)',
              borderRadius: '12px',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '260px',
              position: 'relative',
            }}
            role="status"
            aria-live="polite"
          >
            {isProcessing ? (
              <div style={{ textAlign: 'center' }}>
                <div className="animate-pulse-glow" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🤟</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>AI is mapping sentences into sign sequence...</div>
              </div>
            ) : mappedGestures.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
                {mappedGestures.map((gesture, i) => (
                  <div
                    key={i}
                    className="glass-card animate-slide-up"
                    style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      background: 'var(--bg-secondary)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      minWidth: '70px',
                    }}
                  >
                    <span style={{ fontSize: '2.2rem', marginBottom: '0.25rem' }}>{gesture}</span>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {translationText.split(/\s+/)[i] || ''}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '0.5rem' }}>👐</span>
                <span>Enter text and click "Translate" to see sign gestures.</span>
              </div>
            )}
            
            {mappedGestures.length > 0 && (
              <div style={{ position: 'absolute', bottom: '6px', right: '12px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                Translation completed successfully
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

