'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type AccessTheme = 'light' | 'dark' | 'high-contrast';
export type FontSizeLevel = 1.0 | 1.2 | 1.5;

interface AccessibilityContextProps {
  theme: AccessTheme;
  highContrast: boolean;
  fontSizeMultiplier: FontSizeLevel;
  setTheme: (theme: AccessTheme) => void;
  setFontSizeMultiplier: (size: FontSizeLevel) => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextProps | undefined>(undefined);

export const AccessibilityProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<AccessTheme>('dark'); // Default to modern elegant dark
  const [prevTheme, setPrevTheme] = useState<AccessTheme>('dark');
  const [fontSizeMultiplier, setFontSizeMultiplierState] = useState<FontSizeLevel>(1.0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read user settings from localStorage on client mount
    const savedTheme = localStorage.getItem('accessai-theme') as AccessTheme;
    const savedSize = parseFloat(localStorage.getItem('accessai-font-size') || '1.0') as FontSizeLevel;
    
    if (savedTheme) {
      setThemeState(savedTheme);
      if (savedTheme !== 'high-contrast') {
        setPrevTheme(savedTheme);
      }
    }
    if (savedSize && [1.0, 1.2, 1.5].includes(savedSize)) {
      setFontSizeMultiplierState(savedSize);
    }
    setMounted(true);
  }, []);

  const setTheme = (newTheme: AccessTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('accessai-theme', newTheme);
    if (newTheme !== 'high-contrast') {
      setPrevTheme(newTheme);
    }
  };

  const setFontSizeMultiplier = (size: FontSizeLevel) => {
    setFontSizeMultiplierState(size);
    localStorage.setItem('accessai-font-size', size.toString());
  };

  const toggleHighContrast = () => {
    if (theme === 'high-contrast') {
      setTheme(prevTheme);
    } else {
      setTheme('high-contrast');
    }
  };

  // Sync classes to html/body for CSS styling
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-high-contrast');
    root.classList.add(`theme-${theme}`);
    
    // Scale body font-size based on multiplier
    root.style.fontSize = `${fontSizeMultiplier * 100}%`;
  }, [theme, fontSizeMultiplier, mounted]);

  const highContrast = theme === 'high-contrast';

  return (
    <AccessibilityContext.Provider
      value={{
        theme,
        highContrast,
        fontSizeMultiplier,
        setTheme,
        setFontSizeMultiplier,
        toggleHighContrast,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};

