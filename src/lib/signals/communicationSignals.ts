export type CommunicationSignalKind = 'speech' | 'sound' | 'alert' | 'sign';

export interface CommunicationSignal {
  kind: CommunicationSignalKind;
  label: string;
  intensity?: number;
}

export const COMMUNICATION_SIGNAL_EVENT = 'accessai:communication-signal';

export function emitCommunicationSignal(signal: CommunicationSignal) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<CommunicationSignal>(COMMUNICATION_SIGNAL_EVENT, { detail: signal }));
}
