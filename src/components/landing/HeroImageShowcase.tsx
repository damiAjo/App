'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AudioLines, Captions, Hand, MoveUpRight, ScanFace, Sparkles } from 'lucide-react';

export function HeroImageShowcase() {
  return (
    <section className="hero-showcase" aria-label="AccessAI visual communication showcase">
      <div className="hero-showcase__media">
        <Image
          src="/images/accessai-sign-language-hero.jpg"
          alt="Woman communicating with sign language using both hands"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 1200px"
          className="hero-showcase__image"
        />
        <div className="hero-showcase__veil" aria-hidden="true" />
        <div className="hero-showcase__scan" aria-hidden="true" />
      </div>

      <div className="hero-showcase__intro">
        <span><Sparkles size={15} aria-hidden="true" /> Human communication, amplified</span>
        <h2>Technology that understands how communication moves.</h2>
        <p>Speech, environmental sound, and sign language come together in one visual-first experience.</p>
      </div>

      <div className="hero-float hero-float--caption" aria-hidden="true">
        <span><Captions size={16} /> Live captions</span>
        <strong>Every voice becomes visible.</strong>
        <i><i /></i>
      </div>

      <div className="hero-float hero-float--sound" aria-hidden="true">
        <span><AudioLines size={16} /> Sound detected</span>
        <strong>Doorbell · Front entry</strong>
        <div>{[2, 5, 3, 7, 4, 6, 3, 5].map((height, index) => <i key={index} style={{ height: `${height * 3}px` }} />)}</div>
      </div>

      <div className="hero-float hero-float--sign" aria-hidden="true">
        <span className="icon-badge"><Hand size={20} /></span>
        <span><small>3D SIGNER</small><strong>Angle-ready motion</strong></span>
        <ScanFace size={18} />
      </div>

      <div className="hero-showcase__bottom">
        <span>Visual-first accessibility platform</span>
        <Link href="/dashboard">Explore the workspace <MoveUpRight size={15} aria-hidden="true" /></Link>
      </div>
    </section>
  );
}
