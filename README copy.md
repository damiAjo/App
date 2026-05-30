# AccessAI - Fully Accessible AI-Powered Frontend Platform

A comprehensive, fully accessible, AI-powered frontend platform designed specifically for hearing-impaired users. Built with **React/Next.js**, **TypeScript**, and **WCAG 2.1 AA** accessibility standards, AccessAI prioritizes inclusivity, independence, and real-time communication while delivering a modern, user-friendly experience.

## 🎯 Core Principles

- **Accessibility-First**: WCAG 2.1 AA compliant from day one
- **Inclusivity**: Designed by and for hearing-impaired users
- **Real-Time**: Low-latency AI-powered communication
- **Modularity**: Reusable, scalable component architecture
- **Mobile-First**: Responsive design for all devices
- **Independence**: Full keyboard navigation and screen reader support

## ✨ Key Features

### 🎙️ Live Speech-to-Text Captioning
- Real-time transcription with minimal latency via WebSockets
- Customizable caption display (size, color, opacity, position, font)
- Live updates with screen reader announcements
- Caption history and export capabilities

### 🤟 Sign Language Translation
- AI-powered sign language to text translation
- Video input/output for sign language interface
- Real-time video capture and processing
- Accessible video playback controls

### 💬 AI Chat Assistant
- Fully accessible conversational AI interface
- Support for text and audio input
- Screen reader optimized messaging
- Context-aware responses with history

### 🔊 Environmental Sound Detection
- Real-time detection of important sounds (doorbell, siren, phone, etc.)
- Visual and haptic alert indicators
- Customizable sound categories
- Notification logging and history

### 🚨 Emergency Notifications
- Prominent, accessible alert system
- Multiple alert levels (alert, warning, critical)
- Role-based announcements for screen readers
- Auto-dismissing and persistent notifications

### 📹 Accessible Video Meeting Overlays
- Caption overlays on video streams
- Sign language interpreter window
- Fullscreen and resize controls
- Keyboard navigation support

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 19
- **Language**: TypeScript
- **Real-Time**: WebSocket API
- **Accessibility Testing**: Axe-Core, Lighthouse
- **State Management**: React Context API
- **Styling**: CSS-in-JS with inline styles (accessible by default)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Navigate to the project:**
```bash
cd project
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

### Project Structure

```
src/
├── app/
│   ├── dashboard/          # Main application dashboard
│   ├── accessibility-tests/ # Accessibility testing page
│   ├── page.tsx            # Landing page
│   └── layout.tsx          # Root layout with providers
├── components/
│   ├── accessibility/      # Accessibility-focused components
│   │   ├── HighContrastToggle.tsx
│   │   ├── ScreenReaderAnnouncer.tsx
│   │   ├── SkipToContent.tsx
│   │   └── KeyboardFocusIndicator.tsx
│   └── ai/                 # AI-powered features
│       ├── LiveCaptioning.tsx
│       ├── LiveCaptionDisplay.tsx
│       ├── CaptionCustomizer.tsx
│       ├── AIChatAssistant.tsx
│       ├── SignLanguageTranslator.tsx
│       ├── EnvironmentalSoundDetection.tsx
│       ├── EmergencyNotifications.tsx
│       └── AccessibleVideoOverlay.tsx
├── context/
│   └── AccessibilityContext.tsx
├── services/
│   ├── websocket.ts
│   └── captionSettings.ts
└── utils/
    └── accessibilityTesting.ts
```

## ♿ Accessibility Features

### WCAG 2.1 AA Compliance
- ✅ Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
- ✅ Screen reader support (ARIA labels, roles, live regions)
- ✅ Semantic HTML structure
- ✅ High-contrast mode toggle
- ✅ Focus indicators (3px outline, high contrast)
- ✅ Color contrast ratios (4.5:1 for text)
- ✅ Skip navigation links
- ✅ Proper heading hierarchy

### Customization
Users can customize:
- Caption font size (12-32px)
- Caption colors (text and background)
- Caption opacity (0-100%)
- Caption position (top, center, bottom)
- Font family (Arial, Verdana, Georgia, Monospace)
- High-contrast mode toggle

## 📊 Accessibility Testing

### Built-in Tests
- Keyboard navigation testing
- Screen reader compatibility checks
- Alt text coverage analysis
- ARIA label validation
- Heading structure verification

### Running Tests
1. Navigate to `/accessibility-tests`
2. Click "Run Accessibility Tests"
3. Review results

## 🎓 Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe Accessibility](https://www.deque.com/axe/)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Built with ♿ Accessibility-First Principles**
