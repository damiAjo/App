'use client';

import React from 'react';

interface HighContrastToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export const HighContrastToggle: React.FC<HighContrastToggleProps> = ({ enabled, onToggle }) => (
  <button
    aria-pressed={enabled}
    aria-label={enabled ? 'Disable high contrast mode' : 'Enable high contrast mode'}
    onClick={onToggle}
    style={{
      padding: '0.5rem 1rem',
      background: enabled ? '#000' : '#fff',
      color: enabled ? '#fff' : '#000',
      border: '2px solid',
      borderColor: enabled ? '#fff' : '#000',
      borderRadius: '4px',
      fontWeight: 'bold',
      outline: 'none',
      cursor: 'pointer',
    }}
  >
    {enabled ? 'High Contrast: On' : 'High Contrast: Off'}
  </button>
);
