'use client';

import React, { useState, useEffect } from 'react';
import { CaptionSettings, getCaptionSettings, saveCaptionSettings } from '../../services/captionSettings';

interface CaptionCustomizerProps {
  onSettingsChange: (settings: CaptionSettings) => void;
}

export const CaptionCustomizer: React.FC<CaptionCustomizerProps> = ({ onSettingsChange }) => {
  const [settings, setSettings] = useState<CaptionSettings>(getCaptionSettings());

  const handleChange = (key: keyof CaptionSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    saveCaptionSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        marginBottom: '2rem',
      }}
      role="region"
      aria-label="Caption customization panel"
    >
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginBottom: '1.5rem' }}>
        ⚙️ Caption Display Customizer
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
        {/* Controls Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Font Size slider */}
          <div>
            <label htmlFor="fontSize" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <span>Font Size</span>
              <span style={{ color: 'var(--accent-secondary)' }}>{settings.fontSize}px</span>
            </label>
            <input
              id="fontSize"
              type="range"
              min="14"
              max="36"
              value={settings.fontSize}
              onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
              aria-label="Adjust caption font size from 14 to 36 pixels"
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>

          {/* Opacity slider */}
          <div>
            <label htmlFor="opacity" style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
              <span>Background Opacity</span>
              <span style={{ color: 'var(--accent-secondary)' }}>{Math.round(settings.opacity * 100)}%</span>
            </label>
            <input
              id="opacity"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={settings.opacity}
              onChange={(e) => handleChange('opacity', parseFloat(e.target.value))}
              aria-label="Adjust caption background opacity from 0 to 100 percent"
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
          </div>

          {/* Color pickers row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="textColor" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Text Color
              </label>
              <input
                id="textColor"
                type="color"
                value={settings.textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                aria-label="Select caption text color"
                style={{
                  width: '100%',
                  height: '40px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'transparent',
                  padding: '2px',
                  cursor: 'pointer',
                }}
              />
            </div>
            <div>
              <label htmlFor="bgColor" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Background Color
              </label>
              <input
                id="bgColor"
                type="color"
                value={settings.backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                aria-label="Select caption background color"
                style={{
                  width: '100%',
                  height: '40px',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  background: 'transparent',
                  padding: '2px',
                  cursor: 'pointer',
                }}
              />
            </div>
          </div>

          {/* Position & Font dropdowns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label htmlFor="position" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Overlay Position
              </label>
              <select
                id="position"
                value={settings.position}
                onChange={(e) => handleChange('position', e.target.value as any)}
                aria-label="Select screen overlay position"
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontWeight: '500',
                }}
              >
                <option value="top">Top Screen</option>
                <option value="center">Center Screen</option>
                <option value="bottom">Bottom Screen</option>
              </select>
            </div>
            <div>
              <label htmlFor="fontFamily" style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                Typography Font
              </label>
              <select
                id="fontFamily"
                value={settings.fontFamily}
                onChange={(e) => handleChange('fontFamily', e.target.value)}
                aria-label="Select typography style"
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontWeight: '500',
                }}
              >
                <option value="Arial, sans-serif">Arial (Sans-Serif)</option>
                <option value="'Outfit', sans-serif">Outfit (Modern)</option>
                <option value="Georgia, serif">Georgia (Serif)</option>
                <option value="monospace">Monospace (Terminal)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
            Real-time Styling Preview
          </span>
          <div
            style={{
              height: '100%',
              minHeight: '150px',
              border: '1px dashed var(--border-color)',
              borderRadius: '12px',
              backgroundColor: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                backgroundColor: settings.backgroundColor,
                color: settings.textColor,
                fontSize: `${settings.fontSize}px`,
                fontFamily: settings.fontFamily,
                opacity: settings.opacity,
                padding: '0.75rem 1.25rem',
                borderRadius: '8px',
                textAlign: 'center',
                maxWidth: '90%',
                fontWeight: '500',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              Captions look like this.
            </div>
            <div style={{ position: 'absolute', bottom: '6px', right: '10px', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
              ({settings.position} overlay active)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
