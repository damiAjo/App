'use client';

import React, { useEffect, useState } from 'react';
import { CaptionSettings } from '@/lib/captions/captionSettings';
import { emitCommunicationSignal } from '@/lib/signals/communicationSignals';

interface LiveCaptionDisplayProps {
  caption: string;
  isActive: boolean;
  settings: CaptionSettings;
}

export const LiveCaptionDisplay: React.FC<LiveCaptionDisplayProps> = ({
  caption,
  isActive,
  settings,
}) => {
  const [displayCaption, setDisplayCaption] = useState('');

  useEffect(() => {
    if (isActive) {
      setDisplayCaption(caption);
      if (caption.trim()) emitCommunicationSignal({ kind: 'speech', label: caption, intensity: 0.55 });
    }
  }, [caption, isActive]);

  const positionStyles: Record<string, React.CSSProperties> = {
    top: { top: '1rem' },
    center: { top: '50%', transform: 'translateY(-50%)' },
    bottom: { bottom: '1rem' },
  };

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        ...positionStyles[settings.position],
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: settings.backgroundColor,
        color: settings.textColor,
        fontSize: `${settings.fontSize}px`,
        fontFamily: settings.fontFamily,
        opacity: isActive ? settings.opacity : 0,
        transition: 'opacity 0.3s ease',
        zIndex: 1000,
        pointerEvents: 'none',
        maxWidth: '90%',
        left: '50%',
        transform: settings.position === 'center' ? 'translate(-50%, -50%)' : 'translateX(-50%)',
      }}
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-label="Live captions"
    >
      <span className="caption-words" aria-hidden="true">
        {displayCaption.split(/\s+/).filter(Boolean).map((word, index, words) => <span key={`${word}-${index}`} className={index === words.length - 1 ? 'is-current' : ''}>{word}</span>)}
      </span>
      <span className="sr-only">{displayCaption}</span>
    </div>
  );
};
