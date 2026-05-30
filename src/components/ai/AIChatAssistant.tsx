'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  onMessageSend?: (message: string) => void;
}

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ onMessageSend }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      text: 'Hello! I am your AccessAI assistant. I can help translate speech, explain sign language settings, or coordinate emergency alerts. What can I do for you today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Dynamic quick response helper chips
  const quickChips = [
    "⚠️ Check emergency status",
    "🎙️ How do captions work?",
    "🔊 Activate sound detector",
    "🤟 Sign translation tips"
  ];

  // Map quick responses to smart AI replies
  const replyMap: Record<string, string> = {
    "check emergency status": "Our system reports all green. No active emergency notifications are currently active in your local area. The decibel monitoring is also stable.",
    "how do captions work": "AccessAI uses browser-native SpeechRecognition APIs to record and transcribe audio directly on your device. You can customize font sizes and positions in the 'Captioning' tab.",
    "activate sound detector": "To start sound alerts, navigate to the 'Alerts' tab and click 'Start Monitoring'. We will measure environmental sounds in decibels and visually flag doorbell rings, sirens, and knock signals.",
    "sign translation tips": "Ensure your camera has plenty of light and your hands are fully visible in the webcam window. Type text in the input box to see custom sign language gesture dictionary representations.",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Dictation Speech Setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = 'en-US';

        rec.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          if (transcript) {
            setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
          }
        };

        rec.onerror = (err: any) => {
          console.error('Dictation error', err);
          setIsDictating(false);
        };

        rec.onend = () => {
          setIsDictating(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  const toggleDictation = () => {
    if (!recognitionRef.current) {
      alert('Speech input is not supported in this browser.');
      return;
    }

    if (isDictating) {
      recognitionRef.current.stop();
      setIsDictating(false);
    } else {
      setIsDictating(true);
      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error(err);
        setIsDictating(false);
      }
    }
  };

  const submitMessage = (text: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    onMessageSend?.(text);
    setIsLoading(true);

    // Formulate a smart response based on presets
    setTimeout(() => {
      const normalizedText = text.toLowerCase().trim().replace(/[?]/g, "");
      let reply = "That's very interesting. As an AI assistant, I am designed to support accessibility solutions. Let me know if you would like me to coordinate other panels.";

      // Check matched queries
      for (const [key, val] of Object.entries(replyMap)) {
        if (normalizedText.includes(key)) {
          reply = val;
          break;
        }
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setAnnouncement(`AI Assistant says: ${reply}`); // Screen reader alert
      setIsLoading(false);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    submitMessage(inputValue);
    setInputValue('');
  };

  return (
    <div
      className="glass-panel animate-slide-up"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '480px',
        overflow: 'hidden',
        position: 'relative',
      }}
      role="region"
      aria-label="AI communication partner"
    >
      {/* Screen Reader Announcements */}
      <div
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
        }}
        role="status"
        aria-live="assertive"
      >
        {announcement}
      </div>

      {/* Messages Feed */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '1.5rem',
          backgroundColor: 'var(--bg-tertiary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div
              style={{
                maxWidth: '80%',
                padding: '0.8rem 1.2rem',
                borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                backgroundColor: msg.role === 'user' ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: '#fff',
                border: '1px solid var(--border-color)',
                lineHeight: '1.5',
                fontSize: '0.95rem',
                boxShadow: msg.role === 'user' ? '0 4px 12px rgba(124,58,237,0.15)' : 'none',
              }}
            >
              {msg.text}
              <div
                style={{
                  fontSize: '0.65rem',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  marginTop: '0.4rem',
                  color: msg.role === 'user' ? '#ddd' : 'var(--text-secondary)',
                  fontWeight: '600',
                }}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <span className="animate-pulse-glow" style={{ fontSize: '1.2rem' }}>💬</span>
            <span>Assistant is typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom controls panel */}
      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-secondary)' }}>
        
        {/* Quick Suggestion Chips */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem', overflowX: 'auto', paddingBottom: '4px', whiteSpace: 'nowrap' }}>
          {quickChips.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => submitMessage(chip.substring(3))}
              style={{
                padding: '0.4rem 0.8rem',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-primary)';
                e.currentTarget.style.background = 'var(--accent-primary)15';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'var(--bg-tertiary)';
              }}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage}>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              type="button"
              onClick={toggleDictation}
              aria-pressed={isDictating}
              aria-label={isDictating ? 'Stop speech dictation' : 'Start speech dictation'}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: isDictating ? 'var(--danger)' : 'var(--bg-tertiary)',
                color: '#fff',
                border: '1px solid var(--border-color)',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: isDictating ? '0 0 12px var(--danger)' : 'none',
              }}
            >
              {isDictating ? '🛑' : '🎙️'}
            </button>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isDictating ? 'Speak now, dictating voice...' : 'Type message here...'}
              aria-label="Write chat statement"
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: '50px',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-sans)',
              }}
            />

            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              aria-label="Send message statement"
              style={{
                padding: '0.75rem 1.5rem',
                background: 'var(--success)',
                color: '#fff',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
                opacity: isLoading || !inputValue.trim() ? 0.5 : 1,
                boxShadow: '0 4px 12px rgba(16,185,129,0.2)',
                flexShrink: 0,
              }}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

