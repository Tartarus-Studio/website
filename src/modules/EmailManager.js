/**
 * Email Manager
 * Handles email copying functionality
 */

import { APP_CONFIG, CONTACT_INFO } from '../config/index.js';

export class EmailManager {
  /**
   * Initialize email functionality
   */
  init() {
    this.setupEmailCopy();
  }

  /**
   * Setup email copy button functionality
   */
  setupEmailCopy() {
    const btn = document.getElementById(APP_CONFIG.ELEMENT_IDS.COPY_EMAIL_BTN);
    if (!btn) return;
    
    const handleCopy = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      try {
        await this.copyToClipboard(CONTACT_INFO.EMAIL);
        this.showCopyFeedback(btn);
      } catch (error) {
        this.showCopyError(btn);
      }
    };
    
    btn.addEventListener('click', handleCopy);
    btn.addEventListener('touchstart', handleCopy, { passive: false });
  }

  /**
   * Copy text to clipboard with fallback support
   */
  async copyToClipboard(text) {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return;
      }
      
      // Fallback for older browsers or non-secure contexts
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-1000px';
      textarea.style.top = '-1000px';
      textarea.style.opacity = '0';
      textarea.setAttribute('readonly', '');
      
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, 99999); // For mobile devices
      
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (!successful) {
        throw new Error('Copy command failed');
      }
    } catch (error) {
      console.error('Failed to copy text:', error);
      throw error;
    }
  }

  /**
   * Show success feedback for copy operation
   */
  showCopyFeedback(button) {
    const copyIcon = button.querySelector('.copy-icon');
    const checkIcon = button.querySelector('.check-icon');
    
    if (copyIcon && checkIcon) {
      // Show success state
      copyIcon.style.display = 'none';
      checkIcon.style.display = 'block';
      button.style.color = '#22c55e';
      button.style.transform = 'scale(1.1)';
      
      // Reset after configured duration
      setTimeout(() => {
        copyIcon.style.display = 'block';
        checkIcon.style.display = 'none';
        button.style.color = '';
        button.style.transform = '';
      }, APP_CONFIG.COPY_FEEDBACK_DURATION);
    }
  }

  /**
   * Show error feedback for copy operation
   */
  showCopyError(button) {
    button.style.color = '#ff0080';
    setTimeout(() => {
      button.style.color = '';
    }, APP_CONFIG.ERROR_DISPLAY_DURATION);
  }

  /**
   * Get contact email
   */
  getContactEmail() {
    return CONTACT_INFO.EMAIL;
  }
}
