/**
 * Site Configuration
 * All website-specific information and metadata
 */

export const SITE_INFO = {
  // Basic site information
  NAME: 'Tartarus Studio',
  ALTERNATE_NAME: 'Tartarus',
  TAGLINE: 'Professional Game Development Studio',
  DESCRIPTION: 'Professional game development studio specializing in cyberpunk aesthetics and cutting-edge technology',
  
  // URLs
  DOMAIN: 'tartarus.studio',
  BASE_URL: 'https://tartarus.studio',
  
  // Contact information
  EMAIL: 'contact@tartarus.studio',
  RESPONSE_TIME: '24 hours',
  TIMEZONE: 'UTC+0',
  
  // Company details
  FOUNDING_DATE: '2025',
  INDUSTRY: 'Video Game Development',
  
  // SEO and Social Media
  KEYWORDS: [
    'game development',
    'Unity engine', 
    'cyberpunk games',
    'indie games',
    'action adventure games',
    'horror games',
    'game studio'
  ],
  
  // Social media handles (without @)
  SOCIAL_HANDLES: {
    X: 'tartarus_studio',
    INSTAGRAM: 'tartarus.studio',
    GITHUB: 'tartarus-studio',
    DISCORD: 'sqaehhr6eS'
  },

  // Assets
  LOGO_PATH: './assets/logo.svg',
  LOGO_MONO_PATH: './assets/logo-mono.svg',
  
  // Brand colors
  BRAND_COLORS: {
    PRIMARY: '#dc143c',
    SECONDARY: '#ff0080',
    BACKGROUND: '#0a0a0f'
  }
};

export const SEO_META = {
  // OpenGraph
  OG_TYPE: 'website',
  OG_LOCALE: 'en_US',
  
  // Twitter Card
  TWITTER_CARD: 'summary_large_image',
  
  // JSON-LD Schema types
  SCHEMA_TYPES: {
    ORGANIZATION: 'Organization',
    VIDEO_GAME: 'VideoGame',
    CONTACT_POINT: 'ContactPoint'
  }
};

// Generate full URLs
export const FULL_URLS = {
  SITE: SITE_INFO.BASE_URL,
  LOGO: `${SITE_INFO.BASE_URL}/assets/logo.svg`,
  
  // Social media full URLs
  X: `https://x.com/${SITE_INFO.SOCIAL_HANDLES.X}`,
  INSTAGRAM: `https://instagram.com/${SITE_INFO.SOCIAL_HANDLES.INSTAGRAM}`,
  GITHUB: `https://github.com/${SITE_INFO.SOCIAL_HANDLES.GITHUB}`,
  DISCORD: `https://discord.gg/${SITE_INFO.SOCIAL_HANDLES.DISCORD}`
};
