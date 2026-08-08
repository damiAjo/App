'use client';

import React from 'react';
import { Bell, Hand, Siren } from 'lucide-react';

// SVG Illustration: Person using captions
export const CaptioningIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: '200px' }}>
    {/* Background */}
    <rect width="200" height="200" fill="#f0f4ff" rx="12" />
    
    {/* Head */}
    <circle cx="100" cy="50" r="20" fill="#e8b4a8" />
    
    {/* Eyes */}
    <circle cx="95" cy="48" r="2" fill="#333" />
    <circle cx="105" cy="48" r="2" fill="#333" />
    
    {/* Smile */}
    <path d="M 95 52 Q 100 54 105 52" stroke="#333" strokeWidth="2" fill="none" />
    
    {/* Body */}
    <rect x="85" y="72" width="30" height="40" fill="#4caf50" rx="4" />
    
    {/* Arms */}
    <line x1="85" y1="80" x2="60" y2="90" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    <line x1="115" y1="80" x2="140" y2="90" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    
    {/* Legs */}
    <line x1="90" y1="112" x2="85" y2="145" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    <line x1="110" y1="112" x2="115" y2="145" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    
    {/* Caption box */}
    <rect x="40" y="160" width="120" height="25" fill="#1976d2" rx="4" />
    <text x="100" y="177" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">
      "Live captions"
    </text>
  </svg>
);

// SVG Illustration: Person in video call
export const VideoCallIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: '200px' }}>
    {/* Background */}
    <rect width="200" height="200" fill="#ffe4f0" rx="12" />
    
    {/* Screen frame */}
    <rect x="30" y="20" width="140" height="110" fill="#000" rx="8" />
    
    {/* Person on screen */}
    <circle cx="100" cy="45" r="15" fill="#e8b4a8" />
    <circle cx="95" cy="43" r="2" fill="#333" />
    <circle cx="105" cy="43" r="2" fill="#333" />
    <rect x="80" y="62" width="40" height="35" fill="#ff6b9d" rx="2" />
    
    {/* Camera indicator */}
    <circle cx="100" cy="140" r="12" fill="#4caf50" />
    <circle cx="100" cy="140" r="8" fill="#66bb6a" />
    
    {/* Microphone */}
    <rect x="155" y="115" width="12" height="30" fill="#ff9800" rx="2" />
    <circle cx="161" cy="112" r="6" fill="#ff9800" />
    
    {/* Caption indicator */}
    <rect x="35" y="155" width="130" height="20" fill="#1976d2" rx="3" />
    <text x="100" y="167" textAnchor="middle" fill="#fff" fontSize="8">
      Captions enabled
    </text>
  </svg>
);

// SVG Illustration: Person detecting sounds
export const SoundDetectionIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: '200px' }}>
    {/* Background */}
    <rect width="200" height="200" fill="#fff3e0" rx="12" />
    
    {/* Head */}
    <circle cx="100" cy="60" r="20" fill="#e8b4a8" />
    
    {/* Eyes looking up */}
    <circle cx="95" cy="57" r="2" fill="#333" />
    <circle cx="105" cy="57" r="2" fill="#333" />
    
    {/* Smile */}
    <path d="M 95 62 Q 100 64 105 62" stroke="#333" strokeWidth="2" fill="none" />
    
    {/* Body */}
    <rect x="85" y="82" width="30" height="40" fill="#2196f3" rx="4" />
    
    {/* Arms */}
    <line x1="85" y1="90" x2="60" y2="85" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    <line x1="115" y1="90" x2="140" y2="85" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    
    {/* Legs */}
    <line x1="90" y1="122" x2="85" y2="155" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    <line x1="110" y1="122" x2="115" y2="155" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    
    {/* Sound waves - doorbell */}
    <circle cx="55" cy="50" r="3" fill="none" stroke="#ff9800" strokeWidth="2" />
    <circle cx="55" cy="50" r="8" fill="none" stroke="#ff9800" strokeWidth="1.5" />
    <Bell x={43} y={63} width={24} height={24} color="var(--accent-secondary)" aria-hidden="true" />
    
    {/* Sound waves - siren */}
    <circle cx="145" cy="50" r="3" fill="none" stroke="#f44336" strokeWidth="2" />
    <circle cx="145" cy="50" r="8" fill="none" stroke="#f44336" strokeWidth="1.5" />
    <Siren x={133} y={63} width={24} height={24} color="var(--danger)" aria-hidden="true" />
    
    {/* Alert indicator */}
    <rect x="45" y="165" width="110" height="20" fill="#ff9800" rx="3" />
    <text x="100" y="177" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="bold">
      Sound detected!
    </text>
  </svg>
);

// SVG Illustration: Person with sign language
export const SignLanguageIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: '200px' }}>
    {/* Background */}
    <rect width="200" height="200" fill="#f3e5f5" rx="12" />
    
    {/* Head */}
    <circle cx="100" cy="55" r="18" fill="#e8b4a8" />
    
    {/* Eyes focused */}
    <circle cx="96" cy="53" r="2" fill="#333" />
    <circle cx="104" cy="53" r="2" fill="#333" />
    
    {/* Smile */}
    <path d="M 96 58 Q 100 60 104 58" stroke="#333" strokeWidth="2" fill="none" />
    
    {/* Body */}
    <rect x="85" y="75" width="30" height="40" fill="#9c27b0" rx="4" />
    
    {/* Left arm raised - signing */}
    <line x1="85" y1="85" x2="55" y2="60" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    <circle cx="50" cy="55" r="7" fill="#e8b4a8" />
    
    {/* Right arm raised - signing */}
    <line x1="115" y1="85" x2="145" y2="60" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    <circle cx="150" cy="55" r="7" fill="#e8b4a8" />
    
    {/* Legs */}
    <line x1="90" y1="115" x2="85" y2="155" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    <line x1="110" y1="115" x2="115" y2="155" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    
    {/* Motion lines */}
    <path d="M 50 65 Q 45 60 50 55" stroke="#9c27b0" strokeWidth="2" fill="none" strokeDasharray="3" />
    <path d="M 150 65 Q 155 60 150 55" stroke="#9c27b0" strokeWidth="2" fill="none" strokeDasharray="3" />
    
    {/* Hand symbol */}
    <Hand x={87} y={161} width={26} height={26} color="var(--accent-secondary)" aria-hidden="true" />
  </svg>
);

// SVG Illustration: Person with AI chat
export const ChatAssistantIllustration: React.FC = () => (
  <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ maxWidth: '200px' }}>
    {/* Background */}
    <rect width="200" height="200" fill="#e8f5e9" rx="12" />
    
    {/* Head */}
    <circle cx="100" cy="55" r="18" fill="#e8b4a8" />
    
    {/* Eyes */}
    <circle cx="96" cy="53" r="2" fill="#333" />
    <circle cx="104" cy="53" r="2" fill="#333" />
    
    {/* Smile */}
    <path d="M 96 58 Q 100 60 104 58" stroke="#333" strokeWidth="2" fill="none" />
    
    {/* Body */}
    <rect x="85" y="75" width="30" height="40" fill="#4caf50" rx="4" />
    
    {/* Arms relaxed */}
    <line x1="85" y1="85" x2="60" y2="100" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    <line x1="115" y1="85" x2="140" y2="100" stroke="#e8b4a8" strokeWidth="6" strokeLinecap="round" />
    
    {/* Legs */}
    <line x1="90" y1="115" x2="85" y2="155" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    <line x1="110" y1="115" x2="115" y2="155" stroke="#333" strokeWidth="5" strokeLinecap="round" />
    
    {/* Chat bubbles */}
    <g>
      {/* User message */}
      <rect x="120" y="35" width="65" height="25" fill="#1976d2" rx="4" />
      <text x="152" y="51" textAnchor="middle" fill="#fff" fontSize="8">
        Hello!
      </text>
      
      {/* AI response */}
      <rect x="15" y="70" width="65" height="25" fill="#ccc" rx="4" />
      <text x="47" y="86" textAnchor="middle" fill="#333" fontSize="8">
        Hi there!
      </text>
    </g>
  </svg>
);
