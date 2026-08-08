'use client';

import React, { useState } from 'react';
import { Accessibility, AudioLines, Captions, Contrast, Hand, Home, MessageCircle, Video } from 'lucide-react';
import { useAccessibility, AccessTheme, FontSizeLevel } from '@/lib/accessibility/AccessibilityContext';
import {
  LiveCaptioning,
  LiveCaptionDisplay,
  CaptionCustomizer,
  AIChatAssistant,
  SignLanguageTranslator,
  EnvironmentalSoundDetection,
  EmergencyNotifications,
  AccessibleVideoOverlay,
} from '@/components/ai';
import { CaptionSettings, DEFAULT_CAPTION_SETTINGS } from '@/lib/captions/captionSettings';
import { SiteFooter } from '@/components/layout';
import { MotionPreferenceControl } from '@/components/motion';

export default function Dashboard() {
  const { theme, setTheme, fontSizeMultiplier, setFontSizeMultiplier, toggleHighContrast, highContrast } = useAccessibility();
  const [currentCaption, setCurrentCaption] = useState('');
  const [isCaptioningActive, setIsCaptioningActive] = useState(false);
  const [captionSettings, setCaptionSettings] = useState<CaptionSettings>(DEFAULT_CAPTION_SETTINGS);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div
      style={{
        background: 'transparent',
        color: 'var(--text-primary)',
        minHeight: '100vh',
        padding: '2rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top Header Section */}
      <header
        className="glass-panel animate-slide-up"
        style={{
          padding: '1.5rem 2rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-heading)', margin: 0, letterSpacing: '-0.5px' }}>
            <Accessibility size={30} aria-hidden="true" style={{ verticalAlign: 'text-bottom', marginRight: '0.5rem' }} />
            Access<span style={{ color: 'var(--accent-secondary)' }}>AI</span> Dashboard
          </h1>
          <p style={{ margin: '0.25rem 0 0 0', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Accessible AI-Powered Workspace for Deaf & Hard of Hearing Individuals
          </p>
        </div>

        {/* Accessibility Panel inside Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <MotionPreferenceControl compact />
          
          {/* Theme Selector */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            {(['light', 'dark', 'high-contrast'] as AccessTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                aria-pressed={theme === t}
                style={{
                  padding: '0.4rem 0.8rem',
                  border: 'none',
                  background: theme === t ? 'var(--accent-primary)' : 'transparent',
                  color: theme === t ? '#fff' : 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                }}
                aria-label={`Switch theme color to ${t}`}
              >
                {t === 'high-contrast' ? <><Contrast size={14} aria-hidden="true" /> Contrast</> : t}
              </button>
            ))}
          </div>

          {/* Font Size Selector */}
          <div style={{ display: 'flex', gap: '0.25rem', background: 'var(--bg-tertiary)', padding: '4px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            {([1.0, 1.2, 1.5] as FontSizeLevel[]).map((size) => (
              <button
                key={size}
                onClick={() => setFontSizeMultiplier(size)}
                aria-pressed={fontSizeMultiplier === size}
                style={{
                  padding: '0.4rem 0.8rem',
                  border: 'none',
                  background: fontSizeMultiplier === size ? 'var(--accent-secondary)' : 'transparent',
                  color: fontSizeMultiplier === size ? '#000' : 'var(--text-primary)',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
                aria-label={`Scale page fonts by ${size * 100} percent`}
              >
                {size === 1.0 ? 'A' : size === 1.2 ? 'A+' : 'A++'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Tab Navigation */}
      <nav
        className="glass-panel animate-slide-up"
        style={{
          padding: '0.5rem',
          marginBottom: '2rem',
          display: 'flex',
          gap: '0.5rem',
          flexWrap: 'wrap',
        }}
        role="tablist"
        aria-label="Dashboard Workspace panels"
      >
        {[
          { id: 'overview', label: 'Overview', icon: Home, desc: 'Summary of tools' },
          { id: 'captioning', label: 'Live Captions', icon: Captions, desc: 'Voice recognition' },
          { id: 'chat', label: 'AI Translation', icon: MessageCircle, desc: 'Chat & ASL Gestures' },
          { id: 'video', label: 'Meeting Overlay', icon: Video, desc: 'Conference mockup' },
          { id: 'alerts', label: 'Safety Hub', icon: AudioLines, desc: 'Environmental sound alerts' },
        ].map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '0.75rem 1.5rem',
              background: activeTab === tab.id ? 'var(--accent-primary)' : 'transparent',
              color: activeTab === tab.id ? '#fff' : 'var(--text-primary)',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.95rem',
              transition: 'all 0.25s',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(124,58,237,0.2)' : 'none',
            }}
            aria-label={`${tab.label} - ${tab.desc}`}
          >
            <tab.icon size={18} strokeWidth={2} aria-hidden="true" /> {tab.label}
          </button>
        ))}
      </nav>

      {/* Workspace Display Area */}
      <main id="main-content" style={{ flex: 1, maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {activeTab === 'overview' && (
          <section className="glass-panel animate-slide-up" style={{ padding: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginBottom: '1rem' }}>
              Welcome to your AccessAI Hub
            </h2>
            <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.6', maxWidth: '800px' }}>
              AccessAI is designed specifically to help deaf and hard-of-hearing users navigate communication seamlessly. Speak with AI assistants, dictate voice inputs, view sign animations, monitor environmental sounds, or overlay captions in calls.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                { title: 'Live Speech Captioning', icon: Captions, desc: 'Leverage Web Speech recognition to transcribe microphone signals instantly with customizable sizes.', id: 'captioning' },
                { title: 'Sign Translation Partner', icon: Hand, desc: 'Dictate sentences or type texts to generate responsive gestural sequences in real-time.', id: 'chat' },
                { title: 'AI Conversational Chat', icon: MessageCircle, desc: 'Interact with our inclusive model using preset chips or dictation inputs.', id: 'chat' },
                { title: 'Audio & Sound Monitoring', icon: AudioLines, desc: 'Web Audio decibel analyzer dynamically alerts you to alarms, doorbell rings, door knockings, and sirens.', id: 'alerts' },
              ].map((feat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(feat.id)}
                  className="glass-card"
                  style={{
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    background: 'var(--bg-tertiary)',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  aria-label={`Jump to feature page ${feat.title}`}
                >
                  <div>
                    <div className="icon-badge" style={{ marginBottom: '1rem' }}><feat.icon size={22} aria-hidden="true" /></div>
                    <h3 style={{ fontWeight: 'bold', fontSize: '1.15rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{feat.title}</h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>
                      {feat.desc}
                    </p>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--accent-secondary)', marginTop: '1.25rem', display: 'block', textTransform: 'uppercase' }}>
                    Open Module →
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'captioning' && (
          <section className="animate-slide-up">
            <LiveCaptioning
              onCaptionUpdate={(caption) => {
                setCurrentCaption(caption);
                setIsCaptioningActive(true);
              }}
              onError={(error) => console.error(error)}
            />
            <CaptionCustomizer onSettingsChange={setCaptionSettings} />
            <LiveCaptionDisplay
              caption={currentCaption}
              isActive={isCaptioningActive}
              settings={captionSettings}
            />
          </section>
        )}

        {activeTab === 'chat' && (
          <section className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <AIChatAssistant />
            <SignLanguageTranslator />
          </section>
        )}

        {activeTab === 'video' && (
          <section className="animate-slide-up">
            <AccessibleVideoOverlay />
          </section>
        )}

        {activeTab === 'alerts' && (
          <section className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <EnvironmentalSoundDetection />
            <EmergencyNotifications />
          </section>
        )}
      </main>

      <SiteFooter />
    </div>
  );
}

