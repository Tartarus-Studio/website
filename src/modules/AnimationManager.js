/**
 * Animation Manager
 * Handles all animations, parallax effects, and visual interactions
 */

import { APP_CONFIG, ANIMATION_CONFIG } from '../config/index.js';

export class AnimationManager {
  constructor() {
    this.parallaxEnabled = true;
    this.heroLogo = null;
  }

  /**
   * Initialize all animations
   */
  init() {
    this.cacheElements();
    this.setupIntersectionObserver();
    this.setupImageErrorHandling();
  }

  /**
   * Cache animation-related DOM elements
   */
  cacheElements() {
    this.heroLogo = document.querySelector('.floating-logo');
  }

  /**
   * Setup intersection observer for fade-in animations
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(APP_CONFIG.CSS_CLASSES.ANIMATE_IN);
        }
      });
    }, {
      threshold: ANIMATION_CONFIG.INTERSECTION_THRESHOLD,
      rootMargin: ANIMATION_CONFIG.INTERSECTION_ROOT_MARGIN
    });

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      '.feature-card, .project-card, .contact-card, .social-card'
    );
    
    animatedElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(30px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });

    this.addAnimationStyles();
  }

  /**
   * Add dynamic animation styles
   */
  addAnimationStyles() {
    if (document.getElementById('dynamic-animations')) return;

    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
      .${APP_CONFIG.CSS_CLASSES.ANIMATE_IN} {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Apply parallax effect to hero logo
   */
  applyParallax() {
    if (!this.parallaxEnabled || !this.heroLogo) return;
    
    const scrollY = window.pageYOffset || 0;
    const translateY = scrollY * ANIMATION_CONFIG.PARALLAX_FACTOR;
    this.heroLogo.style.transform = `translateY(${translateY}px)`;
  }

  /**
   * Handle visibility change for performance
   */
  handleVisibilityChange() {
    this.parallaxEnabled = !document.hidden;
  }

  /**
   * Setup error handling for images
   */
  setupImageErrorHandling() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.addEventListener('error', (e) => {
        console.warn(`Failed to load image: ${e.target.src}`);
        this.showImagePlaceholder(e.target);
      });
    });
  }

  /**
   * Show placeholder for failed images
   */
  showImagePlaceholder(img) {
    img.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
    img.style.border = '2px dashed rgba(255, 255, 255, 0.3)';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.alt = 'Image failed to load';
  }

  /**
   * Enable/disable parallax
   */
  setParallaxEnabled(enabled) {
    this.parallaxEnabled = enabled;
  }
}
