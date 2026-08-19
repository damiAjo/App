type BackgroundVariant = 'cinematic' | 'workspace' | 'focus';

interface AdaptiveBackgroundProps {
  variant: BackgroundVariant;
  accent?: 'lime' | 'cyan' | 'violet' | 'red';
}

export function AdaptiveBackground({ variant, accent = 'violet' }: AdaptiveBackgroundProps) {
  return (
    <div className={`adaptive-bg adaptive-bg--${variant} adaptive-bg--${accent}`} aria-hidden="true">
      <div className="adaptive-bg__grid" />
      <div className="adaptive-bg__beam" />
      <div className="adaptive-bg__signal adaptive-bg__signal--primary" />
      <div className="adaptive-bg__signal adaptive-bg__signal--secondary" />
      <div className="adaptive-bg__grain" />
    </div>
  );
}
