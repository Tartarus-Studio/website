/**
 * Meta Manager
 * Handles dynamic meta tags and structured data
 */

import { SITE_INFO, SEO_META, FULL_URLS } from '../config/index.js';

export class MetaManager {
  /**
   * Initialize meta tags
   */
  init() {
    this.updateMetaTags();
    this.updateStructuredData();
  }

  /**
   * Update all meta tags with configuration values
   */
  updateMetaTags() {
    // Basic meta tags
    this.setMetaTag('description', SITE_INFO.DESCRIPTION);
    this.setMetaTag('keywords', SITE_INFO.KEYWORDS.join(', '));
    this.setMetaTag('author', SITE_INFO.NAME);

    // OpenGraph meta tags
    this.setMetaProperty('og:title', SITE_INFO.NAME);
    this.setMetaProperty('og:description', SITE_INFO.DESCRIPTION);
    this.setMetaProperty('og:url', FULL_URLS.SITE);
    this.setMetaProperty('og:image', FULL_URLS.DEFAULT_IMAGE);
    this.setMetaProperty('og:site_name', SITE_INFO.NAME);
    this.setMetaProperty('og:type', SEO_META.OG_TYPE);
    this.setMetaProperty('og:locale', SEO_META.OG_LOCALE);

    // Twitter Card meta tags
    this.setMetaProperty('twitter:card', SEO_META.TWITTER_CARD);
    this.setMetaProperty('twitter:title', SITE_INFO.NAME);
    this.setMetaProperty('twitter:description', SITE_INFO.DESCRIPTION);
    this.setMetaProperty('twitter:url', FULL_URLS.SITE);
    this.setMetaProperty('twitter:image', FULL_URLS.DEFAULT_IMAGE);
    this.setMetaProperty('twitter:site', `@${SITE_INFO.SOCIAL_HANDLES.X}`);
    this.setMetaProperty('twitter:creator', `@${SITE_INFO.SOCIAL_HANDLES.X}`);

    // Update page title
    document.title = `${SITE_INFO.NAME} - ${SITE_INFO.TAGLINE}`;
  }

  /**
   * Update structured data (JSON-LD)
   */
  updateStructuredData() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": SEO_META.SCHEMA_TYPES.ORGANIZATION,
      "name": SITE_INFO.NAME,
      "alternateName": SITE_INFO.ALTERNATE_NAME,
      "url": FULL_URLS.SITE,
      "logo": FULL_URLS.LOGO,
      "description": SITE_INFO.DESCRIPTION,
      "foundingDate": SITE_INFO.FOUNDING_DATE,
      "industry": SITE_INFO.INDUSTRY,
      "knowsAbout": SITE_INFO.KEYWORDS,
      "sameAs": [
        FULL_URLS.X,
        FULL_URLS.INSTAGRAM,
        FULL_URLS.GITHUB,
        FULL_URLS.DISCORD
      ],
      "contactPoint": {
        "@type": SEO_META.SCHEMA_TYPES.CONTACT_POINT,
        "email": SITE_INFO.EMAIL,
        "contactType": "customer service"
      },
      "hasProduct": {
        "@type": SEO_META.SCHEMA_TYPES.VIDEO_GAME,
        "name": "Tartarus: Pyréleus",
        "description": "Action-adventure survival explorational horror game with rogue-lite exploration through procedural underworld temples",
        "genre": ["Action", "Adventure", "Survival", "Horror"],
        "gamePlatform": ["PC", "Windows", "Linux", "macOS"],
        "applicationCategory": "Game",
        "operatingSystem": ["Windows", "Linux", "macOS"],
        "publisher": {
          "@type": SEO_META.SCHEMA_TYPES.ORGANIZATION,
          "name": SITE_INFO.NAME
        }
      }
    };

    // Find and update existing JSON-LD script
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.textContent = JSON.stringify(structuredData, null, 2);
    }
  }

  /**
   * Set meta tag content
   */
  setMetaTag(name, content) {
    let meta = document.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  }

  /**
   * Set meta property content
   */
  setMetaProperty(property, content) {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) {
      meta.content = content;
    }
  }

  /**
   * Update email display in HTML
   */
  updateEmailDisplay() {
    const emailElement = document.querySelector('.email-text');
    if (emailElement) {
      emailElement.textContent = SITE_INFO.EMAIL;
    }
  }
}
