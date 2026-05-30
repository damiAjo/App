'use client';

import React, { useEffect, useRef } from 'react';

interface ScreenReaderAnnouncerProps {
  message: string;
}

export const ScreenReaderAnnouncer: React.FC<ScreenReaderAnnouncerProps> = ({ message }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = '';
      setTimeout(() => {
        if (ref.current) ref.current.textContent = message;
      }, 100);
    }
  }, [message]);

  return (
    <div
      ref={ref}
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        width: '1px',
        height: '1px',
        margin: '-1px',
        padding: 0,
        overflow: 'hidden',
        clip: 'rect(0 0 0 0)',
        border: 0,
      }}
    />
  );
};
