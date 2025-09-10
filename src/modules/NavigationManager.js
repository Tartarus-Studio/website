/**
 * Navigation Manager
 * Handles all navigation-related functionality
 */

import { APP_CONFIG, ANIMATION_CONFIG } from '../config/index.js';

export class NavigationManager {
  constructor() {
    this.navbar = null;
    this.navMenu = null;
    this.navToggle = null;
    this.navProgress = null;
    this.navLinks = null;
  }

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.navbar = document.getElementById(APP_CONFIG.ELEMENT_IDS.NAVBAR);
    this.navMenu = document.getElementById(APP_CONFIG.ELEMENT_IDS.NAV_MENU);
    this.navToggle = document.getElementById(APP_CONFIG.ELEMENT_IDS.NAV_TOGGLE);
    this.navLinks = document.querySelectorAll('.nav-link');
  }

  /**
   * Initialize navigation functionality
   */
  init() {
    this.cacheElements();
    this.setupMobileToggle();
    this.setupSmoothScrolling();
    this.setActiveLink('home');
  }

  /**
   * Setup mobile menu toggle
   */
  setupMobileToggle() {
    if (!this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', () => {
      const isActive = this.navMenu.classList.toggle(APP_CONFIG.CSS_CLASSES.ACTIVE);
      this.navToggle.classList.toggle(APP_CONFIG.CSS_CLASSES.ACTIVE, isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
      this.navToggle.setAttribute('aria-expanded', String(isActive));
    });
  }

  /**
   * Setup smooth scrolling for navigation links
   */
  setupSmoothScrolling() {
    if (!this.navLinks) return;

    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          this.scrollToSection(target);
          this.closeNavMenu();
        }
      });
    });
  }

  /**
   * Scroll to a specific section
   */
  scrollToSection(target) {
    const y = target.offsetTop - APP_CONFIG.SCROLL_OFFSET;
    window.scrollTo({ 
      top: y, 
      behavior: ANIMATION_CONFIG.SCROLL_BEHAVIOR 
    });
  }

  /**
   * Close mobile navigation menu
   */
  closeNavMenu() {
    if (!this.navMenu || !this.navToggle) return;
    
    this.navMenu.classList.remove(APP_CONFIG.CSS_CLASSES.ACTIVE);
    this.navToggle.classList.remove(APP_CONFIG.CSS_CLASSES.ACTIVE);
    document.body.style.overflow = '';
    this.navToggle.setAttribute('aria-expanded', 'false');
  }

  /**
   * Set active navigation link
   */
  setActiveLink(sectionId) {
    if (!this.navLinks) return;
    
    this.navLinks.forEach(link => link.classList.remove(APP_CONFIG.CSS_CLASSES.ACTIVE));
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
      activeLink.classList.add(APP_CONFIG.CSS_CLASSES.ACTIVE);
    }
  }

  /**
   * Update navbar on scroll
   */
  updateNavbar() {
    if (!this.navbar) return;
    
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    this.navbar.classList.toggle(APP_CONFIG.CSS_CLASSES.SCROLLED, scrollY > 50);
  }

  /**
   * Progress bar functionality removed - no longer needed
   */

  /**
   * Update active link based on scroll position
   */
  updateActiveNavLink() {
    if (!this.navLinks) return;
    
    const sections = document.querySelectorAll('section[id]');
    const center = (window.pageYOffset || 0) + window.innerHeight / 2;
    let closest = { id: 'home', distance: Infinity };

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const top = window.pageYOffset + rect.top;
      const middle = top + rect.height / 2;
      const distance = Math.abs(middle - center);
      
      if (distance < closest.distance) {
        closest = { id: section.id, distance };
      }
    });

    this.setActiveLink(closest.id);
  }

  /**
   * Handle window resize
   */
  onResize() {
    if (window.innerWidth > APP_CONFIG.MOBILE_BREAKPOINT) {
      this.closeNavMenu();
    }
  }
}
