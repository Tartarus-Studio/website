/**
 * Application Constants
 * Centralized configuration for all constant values
 */

export const APP_CONFIG = {
  // Application Info
  APP_NAME: 'Tartarus Studio',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION: 'Professional Game Development Studio',
  
  // Performance Settings
  SCROLL_THROTTLE_DELAY: 80, // ~12fps for smooth performance
  SCROLL_OFFSET: 80,
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  
  // UI Settings
  COPY_FEEDBACK_DURATION: 2000,
  ERROR_DISPLAY_DURATION: 1800,
  MOBILE_BREAKPOINT: 768,
  
  // Language Settings
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_LANGUAGES: ['en', 'ar'],
  RTL_LANGUAGES: ['ar'],
  
  // Storage Keys
  STORAGE_KEYS: {
    LANGUAGE: 'language',
    THEME: 'theme',
    ANALYTICS_OPT_OUT: 'analytics-opt-out'
  },
  
  // CSS Classes
  CSS_CLASSES: {
    ACTIVE: 'active',
    SCROLLED: 'scrolled',
    ANIMATE_IN: 'animate-in',
    LANG_PREFIX: 'lang-'
  },
  
  // Element IDs (for better maintainability)
  ELEMENT_IDS: {
    NAVBAR: 'navbar',
    NAV_MENU: 'navMenu',
    NAV_TOGGLE: 'navToggle',
    NAV_PROGRESS: 'navProgress',
    LANGUAGE_SWITCHER: 'languageSwitcher',
    COPY_EMAIL_BTN: 'copyEmailBtn',
    EMAIL_DISPLAY: 'emailDisplay'
  }
};

export const ANIMATION_CONFIG = {
  // Intersection Observer settings
  INTERSECTION_THRESHOLD: 0.1,
  INTERSECTION_ROOT_MARGIN: '0px 0px -50px 0px',
  
  // Parallax settings
  PARALLAX_FACTOR: 0.15,
  
  // Scroll animation settings
  SCROLL_BEHAVIOR: 'smooth'
};

export const SEO_CONFIG = {
  SITE_URL: 'https://tartarus.studio',
  SITE_NAME: 'Tartarus Studio',
  DEFAULT_TITLE: 'Tartarus Studio - Professional Game Development',
  DEFAULT_DESCRIPTION: 'Professional game development with cyberpunk aesthetics and cutting-edge technology',
  DEFAULT_IMAGE: '/assets/works/work-1.webp',
  TWITTER_HANDLE: '@tartarus_studio'
};
