// Accessibility testing utilities using axe-core
export const runAccessibilityTests = async () => {
  if (typeof window === 'undefined') return null;

  // Dynamic import for client-side only
  try {
    const axe = await import('axe-core');
    const results = await axe.run();
    return results;
  } catch (error) {
    console.error('Accessibility testing error:', error);
  }
};

// Keyboard accessibility tests
export const testKeyboardNavigation = () => {
  const elements = document.querySelectorAll('button, a, input, textarea, select');
  return {
    totalInteractiveElements: elements.length,
    focusableElements: Array.from(elements).filter((el) => {
      const style = window.getComputedStyle(el);
      return style.display !== 'none' && style.visibility !== 'hidden';
    }).length,
  };
};

// Screen reader compatibility check
export const testScreenReaderCompatibility = () => {
  const checks = {
    hasLangAttribute: document.documentElement.lang !== '',
    hasPageTitle: document.title !== '',
    hasMainContent: document.querySelector('main') !== null,
    headingsInOrder: checkHeadingStructure(),
    altTextPresent: checkAltText(),
    ariaLabelsUsed: checkAriaLabels(),
  };
  return checks;
};

const checkHeadingStructure = () => {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  if (headings.length === 0) return false;
  const firstHeading = headings[0];
  return firstHeading?.tagName === 'H1';
};

const checkAltText = () => {
  const images = document.querySelectorAll('img');
  let withAlt = 0;
  images.forEach((img) => {
    if (img.hasAttribute('alt') && img.getAttribute('alt') !== '') {
      withAlt++;
    }
  });
  return {
    total: images.length,
    withAlt,
    coverage: images.length > 0 ? ((withAlt / images.length) * 100).toFixed(2) + '%' : 'N/A',
  };
};

const checkAriaLabels = () => {
  const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
  let withAriaLabel = 0;
  interactiveElements.forEach((el) => {
    if (
      el.hasAttribute('aria-label') ||
      el.hasAttribute('aria-labelledby') ||
      el.textContent?.trim()
    ) {
      withAriaLabel++;
    }
  });
  return {
    total: interactiveElements.length,
    withLabels: withAriaLabel,
    coverage:
      interactiveElements.length > 0
        ? ((withAriaLabel / interactiveElements.length) * 100).toFixed(2) + '%'
        : 'N/A',
  };
};

export const generateAccessibilityReport = () => {
  return {
    keyboard: testKeyboardNavigation(),
    screenReader: testScreenReaderCompatibility(),
    timestamp: new Date().toISOString(),
  };
};
