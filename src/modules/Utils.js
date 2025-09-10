/**
 * Utility Functions
 * Common helper functions used across the application
 */

import { APP_CONFIG } from '../config/index.js';

export class Utils {
  /**
   * Throttle function calls for performance
   */
  static throttle(func, delay) {
    let lastCall = 0;
    let timer;
    
    return function(...args) {
      const now = Date.now();
      const remaining = delay - (now - lastCall);
      
      if (remaining <= 0) {
        lastCall = now;
        func.apply(this, args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          lastCall = Date.now();
          func.apply(this, args);
        }, remaining);
      }
    };
  }

  /**
   * Debounce function calls
   */
  static debounce(func, delay) {
    let timer;
    return function(...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  }

  /**
   * Check if device is mobile
   */
  static isMobile() {
    return window.innerWidth <= APP_CONFIG.MOBILE_BREAKPOINT;
  }

  /**
   * Check if browser supports a feature
   */
  static supportsFeature(feature) {
    switch (feature) {
      case 'clipboard':
        return navigator.clipboard && window.isSecureContext;
      case 'intersectionObserver':
        return 'IntersectionObserver' in window;
      case 'localStorage':
        try {
          localStorage.setItem('test', 'test');
          localStorage.removeItem('test');
          return true;
        } catch {
          return false;
        }
      default:
        return false;
    }
  }

  /**
   * Sanitize HTML to prevent XSS
   */
  static sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  /**
   * Format date for display
   */
  static formatDate(date, locale = 'en-US') {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(new Date(date));
  }

  /**
   * Generate unique ID
   */
  static generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Deep clone object
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => Utils.deepClone(item));
    if (typeof obj === 'object') {
      const copy = {};
      Object.keys(obj).forEach(key => {
        copy[key] = Utils.deepClone(obj[key]);
      });
      return copy;
    }
  }

  /**
   * Wait for DOM to be ready
   */
  static domReady(callback) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', callback);
    } else {
      callback();
    }
  }

  /**
   * Smooth scroll to element
   */
  static scrollToElement(element, offset = 0) {
    const y = element.offsetTop - offset;
    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  }

  /**
   * Get scroll position
   */
  static getScrollPosition() {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  /**
   * Check if element is in viewport
   */
  static isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}
