'use client';

import { useEffect, useState } from 'react';
import { AudioLines, Captions, Hand, Pause, Play, Sparkles } from 'lucide-react';
import { useAccessibility } from '@/lib/accessibility/AccessibilityContext';

const steps = [
  { icon: AudioLines, eyebrow: '01 · Listen', title: 'Sound becomes a visible signal', copy: 'Microphone input is translated into a calm, readable visual pattern.' },
  { icon: Captions, eyebrow: '02 · Understand', title: 'Speech becomes live captions', copy: 'Important words stay clear while the active phrase receives gentle emphasis.' },
  { icon: Hand, eyebrow: '03 · Express', title: 'Language moves through an avatar', copy: 'A controllable 3D signer makes motion easier to inspect from different angles.' },
  { icon: Sparkles, eyebrow: '04 · Respond', title: 'Every tool works as one system', copy: 'Alerts, captions, and sign output share one accessible communication layer.' },
];

export function CommunicationStory() {
  const { motionMode } = useAccessibility();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(motionMode === 'full');

  useEffect(() => setPlaying(motionMode === 'full'), [motionMode]);
  useEffect(() => {
    if (!playing || motionMode !== 'full') return;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % steps.length), 3400);
    return () => window.clearInterval(timer);
  }, [playing, motionMode]);

  const step = steps[active];
  const Icon = step.icon;
  return (
    <section className="communication-story" aria-labelledby="communication-story-title">
      <div className="communication-story__copy">
        <span className="section-kicker">One connected experience</span>
        <h2 id="communication-story-title">Communication you can see, follow, and control.</h2>
        <p>AccessAI turns live information into a visual journey instead of leaving users to interpret disconnected tools.</p>
        <div className="communication-story__tabs" role="tablist" aria-label="Communication journey">
          {steps.map((item, index) => <button key={item.title} role="tab" aria-selected={active === index} className={active === index ? 'is-active' : ''} onClick={() => { setActive(index); setPlaying(false); }}><item.icon size={17} aria-hidden="true" /><span>{item.title}</span></button>)}
        </div>
      </div>
      <div className="communication-story__stage" role="tabpanel" aria-live="polite">
        <div className="story-orbit" aria-hidden="true"><span /><span /><span /></div>
        <div className="story-card" key={active}>
          <div className="icon-badge"><Icon size={24} aria-hidden="true" /></div>
          <span>{step.eyebrow}</span><h3>{step.title}</h3><p>{step.copy}</p>
          <div className="story-wave" aria-hidden="true">{Array.from({ length: 18 }, (_, index) => <i key={index} style={{ '--bar': (index % 6) + 1 } as React.CSSProperties} />)}</div>
        </div>
        {motionMode !== 'none' && <button type="button" className="story-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause communication story' : 'Play communication story'}>{playing ? <Pause size={16} /> : <Play size={16} />} {playing ? 'Pause' : 'Play'}</button>}
      </div>
    </section>
  );
}
