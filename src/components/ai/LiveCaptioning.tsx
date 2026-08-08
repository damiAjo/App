'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Captions, FlaskConical, Mic, PlugZap } from 'lucide-react';
import WebSocketService from '@/lib/realtime/websocket';

interface LiveCaptioningProps {
  onCaptionUpdate: (caption: string) => void;
  onError: (error: string) => void;
}

export const LiveCaptioning: React.FC<LiveCaptioningProps> = ({ onCaptionUpdate, onError }) => {
  const [isListening, setIsListening] = useState(false);
  const [mode, setMode] = useState<'speech' | 'websocket' | 'simulate'>('speech');
  const [currentCaption, setCurrentCaption] = useState('');
  
  const wsRef = useRef<WebSocketService | null>(null);
  const recognitionRef = useRef<any>(null);
  const simulationIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Setup Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onresult = (event: any) => {
          let interimTranscript = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              interimTranscript += event.results[i][0].transcript;
            }
          }

          const transcript = finalTranscript || interimTranscript;
          if (transcript) {
            setCurrentCaption(transcript);
            onCaptionUpdate(transcript);
          }
        };

        rec.onerror = (event: any) => {
          console.error('Speech recognition error', event);
          if (event.error === 'not-allowed') {
            onError('Microphone permission blocked. Please enable it in browser settings.');
          } else {
            onError(`Speech error: ${event.error}`);
          }
          stopCaptioning();
        };

        rec.onend = () => {
          // Restart automatically if we should still be listening
          if (isListening && mode === 'speech') {
            try {
              recognitionRef.current.start();
            } catch (err) {
              console.error(err);
            }
          }
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      stopCaptioning();
    };
  }, [isListening, mode, onCaptionUpdate, onError]);

  const startSpeechRecognition = () => {
    if (!recognitionRef.current) {
      onError('Web Speech API is not supported in this browser. Trying simulation mode instead...');
      setMode('simulate');
      startSimulation();
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error(error);
      onError('Failed to start speech recognition.');
    }
  };

  const startWebSocket = async () => {
    try {
      wsRef.current = new WebSocketService('ws://localhost:8080/captions');
      await wsRef.current.connect();

      wsRef.current.on('caption', (data) => {
        const caption = data.text;
        setCurrentCaption(caption);
        onCaptionUpdate(caption);
      });

      setIsListening(true);
    } catch (error) {
      onError('Failed to connect to WebSocket caption server. Using Simulation fallback...');
      setMode('simulate');
      startSimulation();
    }
  };

  const startSimulation = () => {
    setIsListening(true);
    const demoPhrases = [
      "Welcome to the AccessAI real-time captioning stream.",
      "The platform utilizes state-of-the-art browser interfaces for voice recognition.",
      "It is optimized specifically for hearing-impaired and deaf individuals.",
      "Our environmental sound monitoring keeps you safe and informed.",
      "You can customize these captions dynamically in the settings below.",
      "Feel free to try keyboard shortcuts and screen readers, we are fully WCAG compliant!"
    ];

    let index = 0;
    simulationIntervalRef.current = setInterval(() => {
      const phrase = demoPhrases[index % demoPhrases.length];
      setCurrentCaption(phrase);
      onCaptionUpdate(phrase);
      index++;
    }, 4000);
  };

  const startCaptioning = () => {
    setCurrentCaption('');
    if (mode === 'speech') {
      startSpeechRecognition();
    } else if (mode === 'websocket') {
      startWebSocket();
    } else {
      startSimulation();
    }
  };

  const stopCaptioning = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    if (wsRef.current) {
      wsRef.current.disconnect();
      wsRef.current = null;
    }
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current);
      simulationIntervalRef.current = null;
    }
    setIsListening(false);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        marginBottom: '2rem',
      }}
      role="region"
      aria-label="Live speech-to-text captioning controls"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            <Captions size={24} aria-hidden="true" style={{ verticalAlign: 'text-bottom', marginRight: '0.5rem' }} /> Live Captioning Engine
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Transcribe spoken audio in real-time. Fully customizable overlay settings.
          </p>
        </div>

        {/* Input Mode Selector */}
        <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          {(['speech', 'websocket', 'simulate'] as const).map((m) => (
            <button
              key={m}
              onClick={() => !isListening && setMode(m)}
              disabled={isListening}
              style={{
                padding: '0.5rem 0.75rem',
                border: 'none',
                background: mode === m ? 'var(--accent-primary)' : 'transparent',
                color: mode === m ? '#fff' : 'var(--text-primary)',
                fontSize: '0.8rem',
                fontWeight: '600',
                borderRadius: '6px',
                opacity: isListening ? 0.5 : 1,
                cursor: isListening ? 'not-allowed' : 'pointer',
              }}
              aria-label={`Switch transcription source to ${m}`}
            >
              {m === 'speech' ? <><Mic size={15} aria-hidden="true" /> Mic</> : m === 'websocket' ? <><PlugZap size={15} aria-hidden="true" /> Server</> : <><FlaskConical size={15} aria-hidden="true" /> Demo</>}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={isListening ? stopCaptioning : startCaptioning}
          aria-pressed={isListening}
          style={{
            padding: '0.75rem 2rem',
            background: isListening ? 'var(--danger)' : 'var(--success)',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            fontWeight: 'bold',
            fontSize: '1rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          aria-label={isListening ? 'Stop live transcription' : 'Start live transcription'}
        >
          {isListening ? (
            <>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', background: '#fff', borderRadius: '50%', animation: 'pulseGlow 1.5s infinite' }} />
              Stop Transcribing
            </>
          ) : (
            'Start Captcribing'
          )}
        </button>

        {isListening && (
          <span style={{ color: 'var(--success)', fontSize: '0.9rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="animate-pulse-glow" style={{ width: '10px', height: '10px', background: 'var(--success)', borderRadius: '50%' }} />
            {mode === 'speech' ? 'Listening to voice...' : mode === 'websocket' ? 'Streaming from host...' : 'Generating demo captions...'}
          </span>
        )}
      </div>

      {/* Local Preview Box */}
      <div
        style={{
          padding: '1.5rem',
          backgroundColor: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          borderRadius: '12px',
          minHeight: '6rem',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '1.6',
        }}
        role="status"
        aria-live="polite"
      >
        {currentCaption ? (
          <p style={{ fontSize: '1.1rem', margin: 0, fontWeight: '500' }}>{currentCaption}</p>
        ) : (
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            {isListening ? 'Waiting for voice audio...' : 'Click "Start Captcribing" to open audio stream.'}
          </p>
        )}
      </div>
    </div>
  );
};

