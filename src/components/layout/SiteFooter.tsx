import Link from 'next/link';
import { Accessibility, ArrowUpRight, BadgeCheck, Captions, ShieldCheck, Sparkles } from 'lucide-react';

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Workspace' },
  { href: '/accessibility-tests', label: 'Accessibility audit' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__glow" aria-hidden="true" />
      <div className="site-footer__inner">
        <div className="site-footer__lead">
          <Link href="/" className="site-footer__brand" aria-label="AccessAI home">
            <span className="site-footer__brand-mark"><Accessibility size={24} aria-hidden="true" /></span>
            <span>Access<span>AI</span></span>
          </Link>
          <p>Making conversations, environments, and digital experiences easier to understand—visually, instantly, and independently.</p>
          <Link href="/dashboard" className="site-footer__cta">
            Open accessible workspace <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <div>
            <h2>Platform</h2>
            {footerLinks.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
          </div>
          <div>
            <h2>Built around people</h2>
            <span><Captions size={16} aria-hidden="true" /> Visual communication</span>
            <span><ShieldCheck size={16} aria-hidden="true" /> Accessibility-first</span>
            <span><Sparkles size={16} aria-hidden="true" /> Assistive intelligence</span>
          </div>
        </nav>
      </div>

      <div className="site-footer__bottom">
        <span>© {new Date().getFullYear()} AccessAI. Inclusive technology in active development.</span>
        <span className="site-footer__status"><BadgeCheck size={16} aria-hidden="true" /> WCAG-focused interface</span>
      </div>
    </footer>
  );
}
