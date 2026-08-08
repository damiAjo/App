'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Hand, Keyboard, Mic2, UserRound, Video } from 'lucide-react';

interface AccessibleVideoOverlayProps {
  onCaptionToggle?: (enabled: boolean) => void;
  onSignLanguageToggle?: (enabled: boolean) => void;
}

export const AccessibleVideoOverlay: React.FC<AccessibleVideoOverlayProps> = ({
  onCaptionToggle,
  onSignLanguageToggle,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showSignLanguage, setShowSignLanguage] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  // Simulated conference speaker dialogs
  const meetingDialogs = [
    "Speaker: Today we are reviewing accessibility criteria for modern frontend platforms.",
    "Speaker: It is critical that touch elements have at least 48x48px boundaries.",
    "Speaker: Keyboard navigation must follow a logical reading flow without traps.",
    "Speaker: By leveraging Web Speech APIs, we provide inclusive communication systems.",
    "Speaker: Let's ensure contrast ratios hit at least 4.5 to 1 for perfect reading.",
    "Speaker: All forms must be explicitly linked to aria descriptive attributes."
  ];

  // Dynamic caption timeline loop
  useEffect(() => {
    const timer = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % meetingDialogs.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Keyboard hotkey tracking
  useEffect(() => {
    const handleHotkeys = (e: KeyboardEvent) => {
      // Focus checking (ignore hotkeys if typing in inputs)
      const activeEl = document.activeElement?.tagName;
      if (activeEl === 'INPUT' || activeEl === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      if (key === 'c') {
        e.preventDefault();
        const next = !showCaptions;
        setShowCaptions(next);
        onCaptionToggle?.(next);
        triggerSRAnnounce(`Captions turned ${next ? 'on' : 'off'}`);
      } else if (key === 's') {
        e.preventDefault();
        const next = !showSignLanguage;
        setShowSignLanguage(next);
        onSignLanguageToggle?.(next);
        triggerSRAnnounce(`Sign Language Interpreter turned ${next ? 'on' : 'off'}`);
      } else if (key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleHotkeys);
    return () => {
      window.removeEventListener('keydown', handleHotkeys);
    };
  }, [showCaptions, showSignLanguage, isFullscreen]);

  const triggerSRAnnounce = (msg: string) => {
    setAnnouncement(msg);
    setTimeout(() => setAnnouncement(''), 1000);
  };

  const toggleFullscreen = () => {
    if (containerRef.current) {
      if (!document.fullscreenElement) {
        containerRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
          triggerSRAnnounce("Entered full screen mode.");
        }).catch((err) => {
          console.error(err);
        });
      } else {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
          triggerSRAnnounce("Exited full screen mode.");
        });
      }
    }
  };

  // Sync fullscreen change event (e.g. if user hits Esc)
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        marginBottom: '2rem',
      }}
      role="region"
      aria-label="Accessible video meeting interface"
    >
      {/* Screen Reader Announces Hotkey actions */}
      <div style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }} role="status" aria-live="polite">
        {announcement}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            <Video size={24} aria-hidden="true" style={{ verticalAlign: 'text-bottom', marginRight: '0.5rem' }} /> Interactive Video Overlay
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Simulate fully accessible video calls with floating overlays.
          </p>
        </div>

        {/* Keyboard Shortcut Guidelines */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            <Keyboard size={14} aria-hidden="true" /> Hotkeys: [C] Captions
          </span>
          <span style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            [S] Sign Window
          </span>
          <span style={{ fontSize: '0.75rem', padding: '0.3rem 0.6rem', backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '6px', fontWeight: '600', color: 'var(--text-secondary)' }}>
            [F] Fullscreen
          </span>
        </div>
      </div>

      {/* Main conference workspace */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          backgroundColor: '#07080b',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '2px solid var(--border-color)',
          aspectRatio: '16/9',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '3fr 1fr',
          marginBottom: '1.5rem',
        }}
      >
        {/* Main Speaker Feed */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0c0d12', borderRight: '1px solid var(--border-color)' }}>
          {/* Simulated speaker layout */}
          <div style={{ textAlign: 'center', color: 'var(--text-primary)' }}>
            <div className="animate-pulse-glow" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-primary)30', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', margin: '0 auto 1rem' }}>
              <Mic2 size={38} aria-hidden="true" />
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Presenter: Dr. Marcus Vance</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}>Primary Presenter</span>
          </div>

          {/* Captions Overlay layer */}
          {showCaptions && (
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '24px',
                right: '24px',
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                color: '#ffff00', // Highly legible yellow
                padding: '0.8rem 1.5rem',
                borderRadius: '8px',
                textAlign: 'center',
                fontSize: '1.15rem',
                fontWeight: 'bold',
                lineHeight: '1.4',
                border: '1px solid rgba(255,255,255,0.2)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
              }}
              role="status"
              aria-live="assertive"
            >
              {meetingDialogs[captionIndex]}
            </div>
          )}
        </div>

        {/* Column of other attendees & floating Interpreter */}
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gap: '4px', padding: '4px', backgroundColor: '#07080b' }}>
          
          {/* Remote user 1 */}
          <div style={{ background: '#141620', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <UserRound size={26} aria-hidden="true" />
            <span style={{ fontSize: '0.7rem', color: '#fff', position: 'absolute', bottom: '4px', left: '6px', fontWeight: 'bold' }}>Elena (Remote)</span>
          </div>

          {/* Remote user 2 */}
          <div style={{ background: '#141620', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <UserRound size={26} aria-hidden="true" />
            <span style={{ fontSize: '0.7rem', color: '#fff', position: 'absolute', bottom: '4px', left: '6px', fontWeight: 'bold' }}>Kai (Remote)</span>
          </div>

          {/* Floating Sign Interpreter window inside attendees block */}
          <div
            style={{
              background: '#0a355c',
              borderRadius: '8px',
              border: '2px solid var(--accent-secondary)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              opacity: showSignLanguage ? 1 : 0.2,
              transition: 'opacity 0.3s ease',
            }}
            role="region"
            aria-label="Sign Language Interpreter stream"
          >
            <Hand className="animate-pulse-glow" size={29} aria-hidden="true" />
            <span style={{ fontSize: '0.65rem', color: '#00ffff', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '0.25rem' }}>Interpreter</span>
            <span style={{ fontSize: '0.6rem', color: '#fff', position: 'absolute', bottom: '4px', left: '6px', fontWeight: '600' }}>Live ASL Feed</span>
          </div>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          backgroundColor: 'var(--bg-tertiary)',
          padding: '1rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
        }}
      >
        <button
          onClick={() => {
            const next = !showCaptions;
            setShowCaptions(next);
            onCaptionToggle?.(next);
            triggerSRAnnounce(`Captions turned ${next ? 'on' : 'off'}`);
          }}
          aria-pressed={showCaptions}
          aria-label={showCaptions ? 'Hide meeting captions' : 'Show meeting captions'}
          style={{
            padding: '0.6rem 1.5rem',
            background: showCaptions ? 'var(--success)' : 'var(--bg-primary)',
            color: '#fff',
            border: '1px solid var(--border-color)',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          Captions: {showCaptions ? 'Enabled' : 'Disabled'}
        </button>

        <button
          onClick={() => {
            const next = !showSignLanguage;
            setShowSignLanguage(next);
            onSignLanguageToggle?.(next);
            triggerSRAnnounce(`Sign Interpreter turned ${next ? 'on' : 'off'}`);
          }}
          aria-pressed={showSignLanguage}
          aria-label={showSignLanguage ? 'Hide interpreter overlay' : 'Show interpreter overlay'}
          style={{
            padding: '0.6rem 1.5rem',
            background: showSignLanguage ? 'var(--accent-secondary)' : 'var(--bg-primary)',
            color: '#fff',
            border: '1px solid var(--border-color)',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
          }}
        >
          Sign Interpreter: {showSignLanguage ? 'Visible' : 'Hidden'}
        </button>

        <button
          onClick={toggleFullscreen}
          aria-label={isFullscreen ? 'Exit full screen conference layout' : 'Enter full screen conference layout'}
          style={{
            padding: '0.6rem 1.5rem',
            background: 'var(--accent-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            boxShadow: '0 4px 12px rgba(124,58,237,0.15)',
          }}
        >
          {isFullscreen ? 'Exit Full Screen' : 'Toggle Full Screen'}
        </button>
      </div>
    </div>
  );
};

