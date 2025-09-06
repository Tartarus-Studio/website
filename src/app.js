/**
 * Tartarus Studio - Main Application
 * Professional game development studio website
 * Optimized for performance and smooth user experience
 */

class TartarusApp {
  constructor() {
    this.isInitialized = false;
    this.scrollThrottle = null;
    this.resizeThrottle = null;
    
    // Configuration
    this.config = {
      socialLinks: {
        twitter: { url: 'https://twitter.com/tartarus_studio', handle: '@tartarus_studio' },
        discord: { url: 'https://discord.gg/tartarus', handle: 'tartarus_community' },
        github: { url: 'https://github.com/tartarus-studio', handle: 'tartarus-studio' }
      },
      email: 'studio@tartarus.dev',
      scrollOffset: 80,
      throttleDelay: 16 // ~60fps
    };

    this.init();
  }

  /**
   * Initialize the application
   */
  init() {
    if (this.isInitialized) return;

    try {
      this.setupEventListeners();
      this.initializeComponents();
      this.setupSocialLinks();
      this.isInitialized = true;
      console.log('🔥 Tartarus Studio initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Tartarus Studio:', error);
    }
  }

  /**
   * Setup all event listeners
   */
  setupEventListeners() {
    // DOM Content Loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Window events with throttling
    window.addEventListener('scroll', () => this.throttle(() => this.handleScroll(), this.config.throttleDelay));
    window.addEventListener('scroll', () => this.updateActiveNavLink()); // Immediate response for active links
    window.addEventListener('resize', () => this.throttle(() => this.handleResize(), this.config.throttleDelay));
    
    // Page visibility for performance optimization
    document.addEventListener('visibilitychange', () => this.handleVisibilityChange());
  }

  /**
   * DOM ready handler
   */
  onDOMReady() {
    this.setupNavigation();
    this.setupEmailCopy();
    this.initializeAnimations();
    this.handleScroll(); // Initial scroll position
  }

  /**
   * Setup navigation functionality
   */
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navProgress = document.getElementById('navProgress');

    if (!navbar || !navToggle || !navMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.contains('active');
      
      navMenu.classList.toggle('active', !isActive);
      navToggle.classList.toggle('active', !isActive);
      
      // Prevent body scroll when menu is open
      document.body.style.overflow = isActive ? '' : 'hidden';
      
      // Update ARIA attributes
      navToggle.setAttribute('aria-expanded', !isActive);
    });

    // Navigation link clicks
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          this.scrollToSection(targetSection);
          this.closeNavMenu();
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target) && navMenu.classList.contains('active')) {
        this.closeNavMenu();
      }
    });

    // Store references for scroll handling
    this.navbar = navbar;
    this.navProgress = navProgress;
    this.navLinks = navLinks;
    
    // Set initial active state for home
    this.setInitialActiveLink();
  }

  /**
   * Set initial active link on page load
   */
  setInitialActiveLink() {
    if (!this.navLinks) return;
    
    // Remove all active states first
    this.navLinks.forEach(link => link.classList.remove('active'));
    
    // Set home as active by default
    const homeLink = document.querySelector('.nav-link[href="#home"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
  }

  /**
   * Close navigation menu
   */
  closeNavMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
      document.body.style.overflow = '';
      navToggle.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * Smooth scroll to section
   */
  scrollToSection(target) {
    const targetPosition = target.offsetTop - this.config.scrollOffset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }

  /**
   * Setup email copy functionality
   */
  setupEmailCopy() {
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (!copyBtn) return;

    copyBtn.addEventListener('click', async () => {
      try {
        await this.copyToClipboard(this.config.email);
        this.showCopyFeedback(copyBtn);
      } catch (error) {
        console.error('Failed to copy email:', error);
        this.showCopyError(copyBtn);
      }
    });
  }

  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      
      try {
        document.execCommand('copy');
      } finally {
        document.body.removeChild(textArea);
      }
    }
  }

  /**
   * Show copy success feedback
   */
  showCopyFeedback(button) {
    const copyIcon = button.querySelector('.copy-icon');
    const checkIcon = button.querySelector('.check-icon');
    
    if (copyIcon && checkIcon) {
      copyIcon.style.display = 'none';
      checkIcon.style.display = 'block';
      button.style.color = 'var(--color-success)';
      
      setTimeout(() => {
        copyIcon.style.display = 'block';
        checkIcon.style.display = 'none';
        button.style.color = '';
      }, 2000);
    }
  }

  /**
   * Show copy error feedback
   */
  showCopyError(button) {
    button.style.color = 'var(--color-secondary)';
    
    setTimeout(() => {
      button.style.color = '';
    }, 2000);
  }

  /**
   * Setup social links
   */
  setupSocialLinks() {
    Object.entries(this.config.socialLinks).forEach(([platform, data]) => {
      // Update hero social links
      const heroLink = document.getElementById(`${platform}Link`);
      if (heroLink) {
        heroLink.href = data.url;
        heroLink.setAttribute('aria-label', `Follow us on ${platform}`);
      }

      // Update connect section social cards
      const card = document.getElementById(`${platform}Card`);
      const handle = document.getElementById(`${platform}Handle`);
      
      if (card) {
        card.href = data.url;
        card.setAttribute('aria-label', `Visit our ${platform} page`);
      }
      
      if (handle) {
        handle.textContent = data.handle;
      }
    });
  }

  /**
   * Handle scroll events
   */
  handleScroll() {
    if (!this.navbar || !this.navProgress) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / documentHeight) * 100;

    // Update navbar appearance
    this.navbar.classList.toggle('scrolled', scrollTop > 50);

    // Update progress bar
    this.navProgress.style.width = `${Math.min(scrollPercent, 100)}%`;

    // Update active navigation link
    this.updateActiveNavLink();
  }

  /**
   * Update active navigation link based on scroll position
   */
  updateActiveNavLink() {
    if (!this.navLinks) return;

    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    let activeSection = 'home'; // Default to home
    let closestSection = null;
    let closestDistance = Infinity;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionMiddle = sectionTop + (section.offsetHeight / 2);
      
      // Check if section is in viewport
      const inViewport = (sectionTop <= scrollPos + windowHeight) && (sectionBottom >= scrollPos);
      
      if (inViewport) {
        const distanceFromCenter = Math.abs(sectionMiddle - (scrollPos + windowHeight / 2));
        
        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestSection = section.getAttribute('id');
        }
      }
      
      // Alternative check: if scroll position is within section bounds
      if (scrollPos >= sectionTop - 100 && scrollPos < sectionBottom - 100) {
        activeSection = section.getAttribute('id');
      }
    });

    // Use closest section if found, otherwise use the traditional method
    if (closestSection) {
      activeSection = closestSection;
    }

    // If we're at the very top, ensure home is active
    if (scrollPos < 50) {
      activeSection = 'home';
    }

    // Update nav links
    this.navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetSection = href ? href.replace('#', '') : '';
      const isActive = targetSection === activeSection;
      
      // Remove active class from all links first
      link.classList.remove('active');
      
      // Add active class to the current section
      if (isActive) {
        link.classList.add('active');
      }
    });
  }

  /**
   * Handle window resize events
   */
  handleResize() {
    // Close mobile menu on resize to larger screen
    if (window.innerWidth > 768) {
      this.closeNavMenu();
    }

    // Recalculate scroll positions if needed
    this.handleScroll();
  }

  /**
   * Handle page visibility changes for performance
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden - pause expensive operations
      this.pauseAnimations();
    } else {
      // Page is visible - resume operations
      this.resumeAnimations();
    }
  }

  /**
   * Initialize subtle animations
   */
  initializeAnimations() {
    // Intersection Observer for fade-in animations
    this.setupIntersectionObserver();
    
    // Parallax effects for hero section
    this.setupParallaxEffects();
  }

  /**
   * Setup Intersection Observer for animations
   */
  setupIntersectionObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements that should animate in
    const animateElements = document.querySelectorAll(
      '.feature-card, .project-card, .contact-card, .social-card'
    );

    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      this.intersectionObserver.observe(el);
    });

    // Add CSS for animate-in class
    this.addAnimationStyles();
  }

  /**
   * Add animation styles dynamically
   */
  addAnimationStyles() {
    if (document.getElementById('dynamic-animations')) return;

    const style = document.createElement('style');
    style.id = 'dynamic-animations';
    style.textContent = `
      .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Setup parallax effects
   */
  setupParallaxEffects() {
    const heroLogo = document.querySelector('.floating-logo');
    
    if (!heroLogo) return;

    this.heroLogo = heroLogo;
    this.parallaxEnabled = true;
  }

  /**
   * Apply parallax effect to hero logo
   */
  applyParallax() {
    if (!this.parallaxEnabled || !this.heroLogo) return;

    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    const yPos = scrolled * parallaxSpeed;
    
    this.heroLogo.style.transform = `translateY(${yPos}px)`;
  }

  /**
   * Pause animations for performance
   */
  pauseAnimations() {
    this.parallaxEnabled = false;
  }

  /**
   * Resume animations
   */
  resumeAnimations() {
    this.parallaxEnabled = true;
  }

  /**
   * Initialize performance optimized components
   */
  initializeComponents() {
    // Setup performance monitoring
    this.setupPerformanceMonitoring();
    
    // Setup error handling
    this.setupErrorHandling();
  }

  /**
   * Setup performance monitoring
   */
  setupPerformanceMonitoring() {
    // Monitor Core Web Vitals if supported
    if ('web-vitals' in window) {
      // This would be imported from web-vitals library if available
      // For now, we'll do basic performance monitoring
    }

    // Basic performance logging
    if (window.performance && window.performance.mark) {
      performance.mark('tartarus-app-start');
      
      window.addEventListener('load', () => {
        performance.mark('tartarus-app-loaded');
        
        try {
          performance.measure('tartarus-init-time', 'tartarus-app-start', 'tartarus-app-loaded');
          const measure = performance.getEntriesByName('tartarus-init-time')[0];
          console.log(`⚡ App initialization took ${measure.duration.toFixed(2)}ms`);
        } catch (error) {
          // Silently fail if performance measurement isn't supported
        }
      });
    }
  }

  /**
   * Setup global error handling
   */
  setupErrorHandling() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // In production, you might want to send this to an error reporting service
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      // In production, you might want to send this to an error reporting service
    });
  }

  /**
   * Throttle function for performance optimization
   */
  throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return (...args) => {
      const currentTime = Date.now();
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args);
        lastExecTime = currentTime;
      } else {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          func.apply(this, args);
          lastExecTime = Date.now();
        }, delay - (currentTime - lastExecTime));
      }
    };
  }

  /**
   * Destroy the application and clean up
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);

    // Disconnect observers
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }

    // Clear throttle timers
    if (this.scrollThrottle) clearTimeout(this.scrollThrottle);
    if (this.resizeThrottle) clearTimeout(this.resizeThrottle);

    this.isInitialized = false;
    console.log('🔧 Tartarus Studio destroyed');
  }
}

// Initialize the application
const app = new TartarusApp();

// Make app globally available for debugging
if (typeof window !== 'undefined') {
  window.TartarusApp = app;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TartarusApp;
}
