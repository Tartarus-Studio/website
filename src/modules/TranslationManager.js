/**
 * Translation Manager
 * Handles all translation and internationalization functionality
 */

import { APP_CONFIG, API_ENDPOINTS } from '../config/index.js';

export class TranslationManager {
  constructor() {
    this.currentLanguage = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.LANGUAGE) || APP_CONFIG.DEFAULT_LANGUAGE;
    this.translations = {};
    this.isRTL = APP_CONFIG.RTL_LANGUAGES.includes(this.currentLanguage);
  }

  /**
   * Load all translation files
   */
  async loadTranslations() {
    try {
      const [enResponse, arResponse] = await Promise.all([
        fetch(API_ENDPOINTS.TRANSLATIONS.EN),
        fetch(API_ENDPOINTS.TRANSLATIONS.AR)
      ]);
      
      this.translations.en = await enResponse.json();
      this.translations.ar = await arResponse.json();
      
      console.log('✅ Translations loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load translations:', error);
      this.currentLanguage = APP_CONFIG.DEFAULT_LANGUAGE;
    }
  }

  /**
   * Switch to a different language
   */
  switchLanguage(language) {
    if (!APP_CONFIG.SUPPORTED_LANGUAGES.includes(language)) {
      console.error(`Unsupported language: ${language}`);
      return;
    }

    this.currentLanguage = language;
    this.isRTL = APP_CONFIG.RTL_LANGUAGES.includes(language);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.LANGUAGE, language);
    
    this.applyLanguage(language);
    console.log(`🌐 Switched to ${language}`);
  }

  /**
   * Apply language to the entire page
   */
  applyLanguage(language) {
    const translations = this.translations[language];
    if (!translations) {
      console.error(`No translations found for language: ${language}`);
      return;
    }

    // Update document attributes
    document.documentElement.setAttribute('dir', this.isRTL ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
    
    // Update body class
    document.body.className = document.body.className.replace(
      new RegExp(`${APP_CONFIG.CSS_CLASSES.LANG_PREFIX}\\w+`, 'g'), 
      ''
    );
    document.body.classList.add(`${APP_CONFIG.CSS_CLASSES.LANG_PREFIX}${language}`);

    // Translate all elements
    this.translateElements(translations);
    this.updateLanguageSwitcher(translations);
  }

  /**
   * Translate all elements with data-translate attribute
   */
  translateElements(translations) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.getNestedTranslation(translations, key);
      
      if (translation) {
        if (element.innerHTML.includes('<span class="text-highlight">')) {
          element.innerHTML = translation;
        } else {
          element.textContent = translation;
        }
      }
    });
  }

  /**
   * Update language switcher button text
   */
  updateLanguageSwitcher(translations) {
    const languageText = document.querySelector('.language-text');
    if (languageText) {
      languageText.textContent = translations.language?.switch || 
        (this.currentLanguage === 'en' ? 'العربية' : 'English');
    }
  }

  /**
   * Get nested translation value from object
   */
  getNestedTranslation(obj, key) {
    return key.split('.').reduce((o, k) => o && o[k], obj);
  }

  /**
   * Get current language
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }

  /**
   * Check if current language is RTL
   */
  isCurrentLanguageRTL() {
    return this.isRTL;
  }
}
