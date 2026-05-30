// Live caption customization settings and utilities
export interface CaptionSettings {
  fontSize: number; // 12-32px
  backgroundColor: string;
  textColor: string;
  opacity: number; // 0-1
  position: 'top' | 'bottom' | 'center';
  fontFamily: string;
}

export const DEFAULT_CAPTION_SETTINGS: CaptionSettings = {
  fontSize: 16,
  backgroundColor: '#000000',
  textColor: '#FFFFFF',
  opacity: 0.8,
  position: 'bottom',
  fontFamily: 'Arial, sans-serif',
};

export const saveCaptionSettings = (settings: CaptionSettings) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('captionSettings', JSON.stringify(settings));
  }
};

export const getCaptionSettings = (): CaptionSettings => {
  if (typeof window === 'undefined') return DEFAULT_CAPTION_SETTINGS;
  const saved = localStorage.getItem('captionSettings');
  return saved ? JSON.parse(saved) : DEFAULT_CAPTION_SETTINGS;
};
