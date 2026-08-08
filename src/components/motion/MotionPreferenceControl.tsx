'use client';

import { Ban, Gauge, Sparkles } from 'lucide-react';
import { MotionMode, useAccessibility } from '@/lib/accessibility/AccessibilityContext';

const modes: Array<{ value: MotionMode; label: string; icon: typeof Sparkles }> = [
  { value: 'full', label: 'Full', icon: Sparkles },
  { value: 'reduced', label: 'Reduced', icon: Gauge },
  { value: 'none', label: 'Off', icon: Ban },
];

export function MotionPreferenceControl({ compact = false }: { compact?: boolean }) {
  const { motionMode, setMotionMode } = useAccessibility();
  return (
    <div className={`motion-control ${compact ? 'motion-control--compact' : ''}`} role="group" aria-label="Animation preference">
      {!compact && <span>Motion</span>}
      {modes.map(({ value, label, icon: Icon }) => (
        <button key={value} type="button" className={motionMode === value ? 'is-active' : ''} onClick={() => setMotionMode(value)} aria-pressed={motionMode === value} title={`${label} motion`}>
          <Icon size={14} aria-hidden="true" /> <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
