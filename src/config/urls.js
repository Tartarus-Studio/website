/**
 * URL Configuration
 * Centralized management of all URLs and endpoints
 */

import { SITE_INFO, FULL_URLS } from './site.js';

export const SOCIAL_URLS = {
  x: {
    url: FULL_URLS.X,
    handle: `@${SITE_INFO.SOCIAL_HANDLES.X}`,
    displayName: 'X'
  },
  instagram: {
    url: FULL_URLS.INSTAGRAM,
    handle: `@${SITE_INFO.SOCIAL_HANDLES.INSTAGRAM}`,
    displayName: 'Instagram'
  },
  discord: {
    url: FULL_URLS.DISCORD,
    handle: SITE_INFO.SOCIAL_HANDLES.DISCORD,
    displayName: 'Discord'
  },
  github: {
    url: FULL_URLS.GITHUB,
    handle: SITE_INFO.SOCIAL_HANDLES.GITHUB,
    displayName: 'GitHub'
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
    LOGO: SITE_INFO.LOGO_PATH,
    LOGO_MONO: SITE_INFO.LOGO_MONO_PATH
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

};

export const CONTACT_INFO = {
  EMAIL: SITE_INFO.EMAIL,
  RESPONSE_TIME: SITE_INFO.RESPONSE_TIME,
  TIMEZONE: SITE_INFO.TIMEZONE
};
