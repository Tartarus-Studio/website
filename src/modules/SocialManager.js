/**
 * Social Media Manager
 * Handles all social media links and interactions
 */

import { SOCIAL_URLS } from '../config/index.js';

export class SocialManager {
  /**
   * Initialize social media links
   */
  init() {
    this.setupSocialLinks();
  }

  /**
   * Setup all social media links with proper attributes
   */
  setupSocialLinks() {
    Object.entries(SOCIAL_URLS).forEach(([platform, data]) => {
      this.setupHeroSocialLink(platform, data);
      this.setupSocialCard(platform, data);
      this.updateSocialHandle(platform, data);
    });
  }

  /**
   * Setup hero section social links
   */
  setupHeroSocialLink(platform, data) {
    const heroLink = document.getElementById(`${platform}Link`);
    if (heroLink) {
      heroLink.href = data.url;
      heroLink.rel = 'noopener noreferrer';
      heroLink.target = '_blank';
    }
  }

  /**
   * Setup social cards in contact section
   */
  setupSocialCard(platform, data) {
    const card = document.getElementById(`${platform}Card`);
    if (card) {
      card.href = data.url;
      card.rel = 'noopener noreferrer';
      card.target = '_blank';
      card.setAttribute('aria-label', `Visit our ${platform} page`);
    }
  }

  /**
   * Update social handle display text
   */
  updateSocialHandle(platform, data) {
    const handle = document.getElementById(`${platform}Handle`);
    if (handle) {
      handle.textContent = data.handle;
    }
  }

  /**
   * Get social URL for a platform
   */
  getSocialUrl(platform) {
    return SOCIAL_URLS[platform]?.url || '';
  }

  /**
   * Get social handle for a platform
   */
  getSocialHandle(platform) {
    return SOCIAL_URLS[platform]?.handle || '';
  }
}
