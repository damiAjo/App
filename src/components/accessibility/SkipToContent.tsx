'use client';

import React, { useRef, useEffect } from 'react';

export const SkipToContent: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    const handleFocus = () => {
      link.style.transform = 'translateY(0)';
    };

    const handleBlur = () => {
      link.style.transform = 'translateY(-100%)';
    };

    link.addEventListener('focus', handleFocus);
    link.addEventListener('blur', handleBlur);

    return () => {
      link.removeEventListener('focus', handleFocus);
      link.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <a
      ref={linkRef}
      href="#main-content"
      className="skip-to-content"
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        background: '#fff',
        color: '#000',
        padding: '8px 16px',
        zIndex: 1000,
        transform: 'translateY(-100%)',
        transition: 'transform 0.3s',
      }}
    >
      Skip to main content
    </a>
  );
};
