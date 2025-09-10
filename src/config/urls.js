/**
 * URL Configuration
 * Centralized management of all URLs and endpoints
 */

export const SOCIAL_URLS = {
  twitter: {
    url: 'https://x.com/tartarus_studio',
    handle: '@tartarus_studio'
  },
  discord: {
    url: 'https://discord.gg/tartarus-studio',
    handle: 'tartarus-studio'
  },
  github: {
    url: 'https://github.com/tartarus-studio',
    handle: 'tartarus-studio'
  }
};

export const API_ENDPOINTS = {
  // Translation files
  TRANSLATIONS: {
    EN: './src/translations/en.json',
    AR: './src/translations/ar.json'
  },
  
  // Future API endpoints can be added here
  // CONTACT_FORM: '/api/contact',
  // NEWSLETTER: '/api/newsletter',
  // ANALYTICS: '/api/analytics'
};

export const ASSET_URLS = {
  // Images
  IMAGES: {
    LOGO: './assets/logo.svg',
    LOGO_MONO: './assets/logo-mono.svg',
    PROJECT_IMAGE: './assets/works/work-1.webp'
  },
  
  // Icons
  ICONS: {
    ICON_192: './assets/icons/icon-192x192.png',
    ICON_512: './assets/icons/icon-512x512.png',
    ICON_192_SVG: './assets/icons/icon-192x192.svg',
    ICON_512_SVG: './assets/icons/icon-512x512.svg'
  },
  
  // Fonts
  FONTS: {
    GOOGLE_FONTS: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600&family=Cairo:wght@400;600;700&family=Tajawal:wght@400;500;700&display=swap'
  }
};

export const EXTERNAL_LINKS = {
  // Documentation and resources
  MDN_DOCS: 'https://developer.mozilla.org',
  GITHUB_PAGES: 'https://pages.github.com',
  NETLIFY: 'https://netlify.com',
  VERCEL: 'https://vercel.com',
  
  // Game development resources
  UNITY: 'https://unity.com',
  UNREAL: 'https://unrealengine.com'
};

export const CONTACT_INFO = {
  EMAIL: 'studio@tartarus.dev',
  RESPONSE_TIME: '24 hours',
  TIMEZONE: 'UTC+0'
};
