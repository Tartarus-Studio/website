/**
 * Tartarus Studio - Main Application
 * Clean, modular, and professional application architecture
 */

import { APP_CONFIG } from './config/index.js';
import { TranslationManager } from './modules/TranslationManager.js';
import { NavigationManager } from './modules/NavigationManager.js';
import { SocialManager } from './modules/SocialManager.js';
import { EmailManager } from './modules/EmailManager.js';
import { AnimationManager } from './modules/AnimationManager.js';
import { Utils } from './modules/Utils.js';

export class TartarusApp {
  constructor() {
    this.isInitialized = false;
    
    // Initialize managers
    this.translationManager = new TranslationManager();
    this.navigationManager = new NavigationManager();
    this.socialManager = new SocialManager();
    this.emailManager = new EmailManager();
    this.animationManager = new AnimationManager();
    
    // Bind methods for event listeners
    this.onScroll = Utils.throttle(this.handleScroll.bind(this), APP_CONFIG.SCROLL_THROTTLE_DELAY);
    this.onResize = Utils.throttle(this.handleResize.bind(this), APP_CONFIG.SCROLL_THROTTLE_DELAY);
    this.onVisibilityChange = this.handleVisibilityChange.bind(this);
    
    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    if (this.isInitialized) return;

    Utils.domReady(() => this.onDOMReady());
    this.setupEventListeners();
    
    this.isInitialized = true;
    console.log('🔥 Tartarus Studio initialized');
  }

  /**
   * Setup global event listeners
   */
  setupEventListeners() {
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  /**
   * Handle DOM ready event
   */
  async onDOMReady() {
    try {
      // Load translations first
      await this.translationManager.loadTranslations();
      
      // Initialize all managers
      this.setupLanguageSwitcher();
      this.navigationManager.init();
      this.socialManager.init();
      this.emailManager.init();
      this.animationManager.init();
      
      // Apply initial language
      this.translationManager.applyLanguage(this.translationManager.getCurrentLanguage());
      
      // Initial scroll state
      this.handleScroll();
      
      console.log('✅ Application fully initialized');
    } catch (error) {
      console.error('❌ Failed to initialize application:', error);
      this.showFallbackUI();
    }
  }

  /**
   * Setup language switcher functionality
   */
  setupLanguageSwitcher() {
    const switcher = document.getElementById(APP_CONFIG.ELEMENT_IDS.LANGUAGE_SWITCHER);
    if (!switcher) return;

    switcher.addEventListener('click', () => {
      const currentLang = this.translationManager.getCurrentLanguage();
      const newLanguage = currentLang === 'en' ? 'ar' : 'en';
      this.translationManager.switchLanguage(newLanguage);
    });
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    this.navigationManager.updateNavbar();
    this.navigationManager.updateProgress();
    this.navigationManager.updateActiveNavLink();
    this.animationManager.applyParallax();
  }

  /**
   * Handle resize events
   */
  handleResize() {
    this.navigationManager.onResize();
    // Recompute scroll-dependent values
    this.handleScroll();
  }

  /**
   * Handle visibility change for performance optimization
   */
  handleVisibilityChange() {
    this.animationManager.handleVisibilityChange();
  }

  /**
   * Show fallback UI in case of critical errors
   */
  showFallbackUI() {
    document.body.style.display = 'block';
    const fallback = document.createElement('div');
    fallback.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: white; background: #0a0a0f; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;">
        <h1 style="font-size: 2rem; margin-bottom: 1rem;">Tartarus Studio</h1>
        <p style="font-size: 1.2rem; margin-bottom: 1rem;">Professional Game Development</p>
        <p style="opacity: 0.8;">Please refresh the page or contact us at studio@tartarus.dev</p>
      </div>
    `;
    document.body.appendChild(fallback);
  }

  /**
   * Clean up resources and event listeners
   */
  destroy() {
    try {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onResize);
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
      this.isInitialized = false;
      console.log('🧹 Application cleaned up');
    } catch (error) {
      console.error('❌ Error during cleanup:', error);
    }
  }

  /**
   * Get application version
   */
  getVersion() {
    return APP_CONFIG.APP_VERSION;
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.translationManager.getCurrentLanguage();
  }
}
