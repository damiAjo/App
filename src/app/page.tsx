'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Accessibility, AudioLines, Captions, Contrast, Hand, Lightbulb, MessageCircle, Video } from 'lucide-react';
import { SignAvatarViewer } from '@/components/avatar';
import { AdaptiveBackground, SiteFooter } from '@/components/layout';
import { CommunicationStory, MotionPreferenceControl } from '@/components/motion';
import { HeroImageShowcase } from '@/components/landing';
import { useAccessibility } from '@/lib/accessibility/AccessibilityContext';
import {
  CaptioningIllustration,
  VideoCallIllustration,
  SoundDetectionIllustration,
  SignLanguageIllustration,
  ChatAssistantIllustration,
} from '@/components/illustrations/HumanIllustrations';

const features = [
  {
    icon: Captions,
    title: 'Live Speech-to-Text',
    desc: 'Leverage Web Speech recognition to transcribe microphone signals instantly with customizable sizes.',
    illustration: 'captioning',
  },
  {
    icon: Hand,
    title: 'Sign Language translation',
    desc: 'Dictate sentences or type texts to generate responsive gestural sequences in real-time.',
    illustration: 'signlanguage',
  },
  {
    icon: MessageCircle,
    title: 'AI Conversational Chat',
    desc: 'Interact with our inclusive model using preset chips or dictation inputs.',
    illustration: 'chat',
  },
  {
    icon: AudioLines,
    title: 'Audio & Sound Monitoring',
    desc: 'Web Audio decibel analyzer dynamically alerts you to alarms, doorbell rings, door knockings, and sirens.',
    illustration: 'sounddetection',
  },
  {
    icon: Video,
    title: 'Accessible Video Overlays',
    desc: 'Caption overlays and picture-in-picture interpreter windows for video meetings.',
    illustration: 'videocall',
  },
  {
    icon: Contrast,
    title: 'WCAG AAA Color Engine',
    desc: 'Toggle standard dark theme, bright light theme, or contrast mode with one click.',
    illustration: 'videocall',
  },
];

const illustrationMap: Record<string, React.ReactNode> = {
  captioning: <CaptioningIllustration />,
  signlanguage: <SignLanguageIllustration />,
  chat: <ChatAssistantIllustration />,
  sounddetection: <SoundDetectionIllustration />,
  videocall: <VideoCallIllustration />,
};

export default function Home() {
  const { theme, setTheme, fontSizeMultiplier, setFontSizeMultiplier, toggleHighContrast } = useAccessibility();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="app-shell app-shell--landing">
      <AdaptiveBackground variant="cinematic" accent="violet" />

      {/* Landing Header */}
      <header
        className="glass-panel animate-slide-up"
        style={{
          maxWidth: '1200px',
          margin: '1.5rem auto',
          padding: '1rem 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          position: 'relative',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Accessibility size={30} strokeWidth={2.2} aria-hidden="true" />
          <span style={{ fontWeight: '800', fontSize: '1.4rem', fontFamily: 'var(--font-heading)', letterSpacing: '-0.5px' }}>
            Access<span style={{ color: 'var(--accent-secondary)' }}>AI</span>
          </span>
        </div>

        {/* Global theme controls */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <MotionPreferenceControl compact />
          <button
            onClick={() => setTheme(theme === 'high-contrast' ? 'dark' : 'high-contrast')}
            aria-pressed={theme === 'high-contrast'}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: theme === 'high-contrast' ? '#ffff00' : 'var(--bg-tertiary)',
              color: theme === 'high-contrast' ? '#000' : 'var(--text-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            <Contrast size={16} aria-hidden="true" /> High Contrast
          </button>
          
          <Link
            href="/dashboard"
            style={{
              padding: '0.5rem 1.25rem',
              backgroundColor: 'var(--accent-primary)',
              color: '#fff',
              borderRadius: '50px',
              fontWeight: '700',
              fontSize: '0.8rem',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)',
            }}
          >
            Open Dashboard
          </Link>
        </div>
      </header>

      <HeroImageShowcase />

      {/* Hero Section */}
      <section
        style={{
          padding: '4rem 1rem',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          
          {/* Hero left text */}
          <div className="animate-slide-up">
            <h1
              style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                fontFamily: 'var(--font-heading)',
                marginBottom: '1rem',
                lineHeight: '1.15',
                letterSpacing: '-1.5px',
              }}
            >
              Inclusive Communication <br />
              <span className="text-gradient">Powered by AI.</span>
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '500px' }}>
              AccessAI breaks barriers by providing real-time speech captioning, sign language vision displays, smart audio alerts, and accessible conference layouts.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                href="/dashboard"
                style={{
                  padding: '0.9rem 2.2rem',
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  borderRadius: '50px',
                  fontWeight: '800',
                  fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(6,182,212,0.25)',
                }}
              >
                Launch Application
              </Link>
              <Link
                href="/accessibility-tests"
                style={{
                  padding: '0.9rem 2.2rem',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1rem',
                }}
              >
                Auditing Center
              </Link>
            </div>
          </div>

          {/* Hero right graphic preview */}
          <div
            className="glass-panel animate-slide-up"
            style={{
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              boxShadow: 'var(--shadow)',
            }}
          >
            <div style={{ width: '100%', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SignAvatarViewer compact title="Interactive AccessAI avatar preview" />
            </div>
            
            {/* Live Interactive preview bar */}
            <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1rem', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--accent-secondary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.4rem' }}>
                LIVE PREVIEW WIDGET
              </span>
              <p style={{ margin: 0, fontWeight: '600', fontSize: '0.95rem' }}>
                "AccessAI delivers beautiful visual feedback for hearing-impaired users."
              </p>
            </div>
          </div>

        </div>
      </section>

      <CommunicationStory />

      {/* Main Features Grid */}
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 1rem' }}>
        <section>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-heading)', letterSpacing: '-1px' }}>
              <Lightbulb size={34} strokeWidth={1.9} aria-hidden="true" style={{ verticalAlign: 'text-bottom', marginRight: '0.65rem', color: 'var(--accent-secondary)' }} />
              Assistive Features Built to Scale
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
              Prioritizing absolute WCAG 2.1 accessibility alongside state-of-the-art designs.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2rem',
            }}
          >
            {features.map((feat, i) => (
              <div
                key={i}
                className="glass-card animate-slide-up"
                style={{
                  padding: '2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  minHeight: '220px',
                }}
              >
                <div className="icon-badge" style={{ marginBottom: '1rem' }}>
                  <feat.icon size={24} strokeWidth={2} aria-hidden="true" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
                    {feat.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

