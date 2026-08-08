'use client';

import { useEffect, useState } from 'react';
import { COMMUNICATION_SIGNAL_EVENT, CommunicationSignal } from '@/lib/signals/communicationSignals';
import { useAccessibility } from '@/lib/accessibility/AccessibilityContext';

interface Pulse extends CommunicationSignal { id: number; }

export function CommunicationPulseLayer() {
  const { motionMode } = useAccessibility();
  const [pulses, setPulses] = useState<Pulse[]>([]);

  useEffect(() => {
    if (motionMode === 'none') return;
    const handleSignal = (event: Event) => {
      const signal = (event as CustomEvent<CommunicationSignal>).detail;
      const id = Date.now() + Math.random();
      setPulses((current) => [...current.slice(-2), { ...signal, id }]);
      window.setTimeout(() => setPulses((current) => current.filter((pulse) => pulse.id !== id)), motionMode === 'reduced' ? 900 : 1800);
    };
    window.addEventListener(COMMUNICATION_SIGNAL_EVENT, handleSignal);
    return () => window.removeEventListener(COMMUNICATION_SIGNAL_EVENT, handleSignal);
  }, [motionMode]);

  if (motionMode === 'none') return null;
  return <div className="communication-pulse-layer" aria-hidden="true">{pulses.map((pulse) => <span key={pulse.id} className={`communication-pulse communication-pulse--${pulse.kind}`} style={{ '--signal-strength': pulse.intensity ?? 0.7 } as React.CSSProperties} />)}</div>;
}
