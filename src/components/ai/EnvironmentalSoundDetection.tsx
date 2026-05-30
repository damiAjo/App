'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SoundAlert {
  id: string;
  sound: string;
  icon: string;
  description: string;
  isDetected: boolean;
  color: string;
}

interface EnvironmentalSoundDetectionProps {
  onSoundDetected?: (sound: string) => void;
}

export const EnvironmentalSoundDetection: React.FC<EnvironmentalSoundDetectionProps> = ({
  onSoundDetected,
}) => {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [dbLevel, setDbLevel] = useState(0);
  const [detectedSounds, setDetectedSounds] = useState<SoundAlert[]>([
    { id: '1', sound: 'doorbell', icon: '🔔', description: 'Doorbell', isDetected: false, color: '#06b6d4' },
    { id: '2', sound: 'phone', icon: '📱', description: 'Phone Ringing', isDetected: false, color: '#3b82f6' },
    { id: '3', sound: 'alarm', icon: '⏰', description: 'Safety Alarm', isDetected: false, color: '#f59e0b' },
    { id: '4', sound: 'knock', icon: '🚪', description: 'Door Knocking', isDetected: false, color: '#10b981' },
    { id: '5', sound: 'siren', icon: '🚨', description: 'Emergency Siren', isDetected: false, color: '#ef4444' },
    { id: '6', sound: 'baby-cry', icon: '👶', description: 'Baby Crying', isDetected: false, color: '#ec4899' },
  ]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const simulateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Stop monitoring and release all media resources
  const stopMonitoring = () => {
    setIsMonitoring(false);
    setDbLevel(0);

    // Stop audio context animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Stop all microphone tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Close Audio Context
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Clear simulation intervals
    if (simulateIntervalRef.current) {
      clearInterval(simulateIntervalRef.current);
      simulateIntervalRef.current = null;
    }

    // Reset detection flags
    setDetectedSounds((prev) => prev.map((s) => ({ ...s, isDetected: false })));
  };

  const startMonitoring = async () => {
    try {
      // Get browser microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Setup Web Audio API
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextClass();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      setIsMonitoring(true);

      // Render frequency level loop
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const drawWave = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume level (decibels)
        let total = 0;
        for (let i = 0; i < bufferLength; i++) {
          total += dataArray[i];
        }
        const average = total / bufferLength;
        // Scale decibels representation
        setDbLevel(Math.min(100, Math.round((average / 255) * 100 * 1.5)));

        // Render visual canvas wave
        const canvas = canvasRef.current;
        if (canvas) {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Neon gradient wave
            const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
            grad.addColorStop(0, '#7c3aed');
            grad.addColorStop(0.5, '#06b6d4');
            grad.addColorStop(1, '#10b981');
            
            ctx.fillStyle = grad;
            const barWidth = (canvas.width / bufferLength) * 2;
            let x = 0;

            for (let i = 0; i < bufferLength; i++) {
              const barHeight = (dataArray[i] / 255) * canvas.height * 0.9;
              ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight);
              x += barWidth;
            }
          }
        }

        animationFrameRef.current = requestAnimationFrame(drawWave);
      };

      drawWave();

      // Setup simulated AI classifier triggering sound alerts randomly to showcase system response
      simulateIntervalRef.current = setInterval(() => {
        // Randomly pick a sound
        const randomIndex = Math.floor(Math.random() * detectedSounds.length);
        const randomSound = detectedSounds[randomIndex];

        setDetectedSounds((prev) =>
          prev.map((s) =>
            s.id === randomSound.id ? { ...s, isDetected: true } : { ...s, isDetected: false }
          )
        );

        onSoundDetected?.(randomSound.sound);

        // Haptic pulse feedback
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          navigator.vibrate([200, 100, 200]);
        }

        // Auto clear visual alert after 3.5 seconds
        setTimeout(() => {
          setDetectedSounds((prev) =>
            prev.map((s) => (s.id === randomSound.id ? { ...s, isDetected: false } : s))
          );
        }, 3500);
      }, 7000);

    } catch (error) {
      console.error('Audio monitoring setup failed:', error);
      alert('Microphone access is required for live decibel detection.');
      stopMonitoring();
    }
  };

  // Perform proper cleanup on unmount
  useEffect(() => {
    return () => {
      stopMonitoring();
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
      aria-label="Environmental sound detection hub"
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            🔊 Environmental Sound Detection
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Listens for environmental sound waves and signals critical events.
          </p>
        </div>

        <button
          onClick={isMonitoring ? stopMonitoring : startMonitoring}
          aria-pressed={isMonitoring}
          aria-label={isMonitoring ? 'Stop sound detection' : 'Start sound detection'}
          style={{
            padding: '0.6rem 1.5rem',
            background: isMonitoring ? 'var(--danger)' : 'var(--success)',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >
          {isMonitoring ? 'Stop Monitoring' : 'Start Monitoring'}
        </button>
      </div>

      {/* Visual Volume Meter */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {/* DB Circular Meter */}
        <div
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>AUDIO LEVEL</span>
          <div style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0.5rem 0', color: isMonitoring ? 'var(--accent-secondary)' : 'var(--text-secondary)' }}>
            {dbLevel}<span style={{ fontSize: '1rem', fontWeight: '500' }}>dB</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: dbLevel > 60 ? 'var(--danger)' : 'var(--success)' }}>
            {dbLevel > 60 ? '🚨 LOUD' : isMonitoring ? '🔊 ACTIVE' : '🤫 MUTED'}
          </span>
        </div>

        {/* Live Audio Visualizer Stream */}
        <div
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>FREQUENCY SPECTRUM</span>
          <canvas
            ref={canvasRef}
            width="300"
            height="70"
            style={{ width: '100%', height: '70px', background: 'transparent' }}
          />
          {!isMonitoring && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: '#ccc', fontWeight: '600' }}>Monitoring off</span>
            </div>
          )}
        </div>
      </div>

      {/* Grid of monitored signals */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
        }}
      >
        {detectedSounds.map((sound) => (
          <div
            key={sound.id}
            style={{
              padding: '1.25rem 1rem',
              border: '2px solid',
              borderColor: sound.isDetected ? sound.color : 'var(--border-color)',
              borderRadius: '12px',
              textAlign: 'center',
              backgroundColor: sound.isDetected ? `${sound.color}15` : 'var(--bg-tertiary)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: sound.isDetected ? `0 0 16px ${sound.color}30` : 'none',
              transform: sound.isDetected ? 'scale(1.05)' : 'scale(1)',
            }}
            role="status"
            aria-live="polite"
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem', transform: sound.isDetected ? 'scale(1.2) rotate(10deg)' : 'scale(1)', transition: 'transform 0.2s ease' }}>{sound.icon}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>{sound.description}</div>
            
            <div style={{
              fontSize: '0.75rem',
              fontWeight: '800',
              marginTop: '0.5rem',
              color: sound.color,
              opacity: sound.isDetected ? 1 : 0.4,
            }}>
              {sound.isDetected ? '🔔 DETECTED!' : 'LISTENING'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

