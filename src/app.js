/**
 * Tartarus Studio - Main Application (Optimized)
 */
class TartarusApp {
  constructor() {
    this.isInitialized = false;

    this.config = {
      socialLinks: {
        twitter: { url: 'https://twitter.com/tartarus_studio', handle: '@tartarus_studio' },
        discord: { url: 'https://discord.gg/tartarus', handle: 'tartarus_community' },
        github:  { url: 'https://github.com/tartarus-studio', handle: 'tartarus-studio' }
      },
      email: 'studio@tartarus.dev',
      scrollOffset: 80,
      throttleDelay: 80 // ~12fps for heavy scroll work; smoother + efficient
    };

    // Pre-bind handlers (so we can add/remove cleanly)
    this.onScrollThrottled = this.throttle(this.onScroll.bind(this), this.config.throttleDelay);
    this.onResizeThrottled = this.throttle(this.onResize.bind(this), this.config.throttleDelay);
    this.onVisibilityChange = this.handleVisibilityChange.bind(this);

    this.init();
  }

  init() {
    if (this.isInitialized) return;

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
    } else {
      this.onDOMReady();
    }

    // Passive listeners for better scroll performance
    window.addEventListener('scroll', this.onScrollThrottled, { passive: true });
    window.addEventListener('resize', this.onResizeThrottled, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);

    this.isInitialized = true;
    // eslint-disable-next-line no-console
    console.log('🔥 Tartarus Studio initialized');
  }

  onDOMReady() {
    this.cache();
    this.setupNavigation();
    this.setupSocialLinks();
    this.setupEmailCopy();
    this.initializeAnimations();

    // Initial state
    this.onScroll(); // sets progress + active link + parallax
  }

  cache() {
    this.navbar = document.getElementById('navbar');
    this.navMenu = document.getElementById('navMenu');
    this.navToggle = document.getElementById('navToggle');
    this.navProgress = document.getElementById('navProgress');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.heroLogo = document.querySelector('.floating-logo');
  }

  /* ========= Navigation ========= */
  setupNavigation() {
    if (!this.navbar || !this.navToggle || !this.navMenu) return;

    this.navToggle.addEventListener('click', () => {
      const active = this.navMenu.classList.toggle('active');
      this.navToggle.classList.toggle('active', active);
      document.body.style.overflow = active ? 'hidden' : '';
      this.navToggle.setAttribute('aria-expanded', String(active));
    });

    // Smooth scroll on click
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) this.scrollToSection(target);
        this.closeNavMenu();
      });
    });

    // Set initial active link to home
    this.setActiveLink('home');
  }

  closeNavMenu() {
    if (!this.navMenu || !this.navToggle) return;
    this.navMenu.classList.remove('active');
    this.navToggle.classList.remove('active');
    document.body.style.overflow = '';
    this.navToggle.setAttribute('aria-expanded', 'false');
  }

  setActiveLink(sectionId) {
    if (!this.navLinks) return;
    this.navLinks.forEach(l => l.classList.remove('active'));
    const active = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (active) active.classList.add('active');
  }

  scrollToSection(target) {
    const y = target.offsetTop - this.config.scrollOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  /* ========= Email Copy ========= */
  setupEmailCopy() {
    const btn = document.getElementById('copyEmailBtn');
    if (!btn) return;
    btn.addEventListener('click', async () => {
      try {
        await this.copyToClipboard(this.config.email);
        this.showCopyFeedback(btn);
      } catch {
        this.showCopyError(btn);
      }
    });
  }

  async copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-1000px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }

  showCopyFeedback(button) {
    const copyIcon = button.querySelector('.copy-icon');
    const checkIcon = button.querySelector('.check-icon');
    if (copyIcon && checkIcon) {
      copyIcon.style.display = 'none';
      checkIcon.style.display = 'block';
      button.style.color = '#22c55e';
      setTimeout(() => {
        copyIcon.style.display = 'block';
        checkIcon.style.display = 'none';
        button.style.color = '';
      }, 1800);
    }
  }
  showCopyError(button) {
    button.style.color = '#ff0080';
    setTimeout(() => (button.style.color = ''), 1800);
  }

  /* ========= Social ========= */
  setupSocialLinks() {
    for (const [platform, data] of Object.entries(this.config.socialLinks)) {
      const heroLink = document.getElementById(`${platform}Link`);
      if (heroLink) {
        heroLink.href = data.url;
        heroLink.rel = 'noopener noreferrer';
        heroLink.target = '_blank';
      }
      const card = document.getElementById(`${platform}Card`);
      const handle = document.getElementById(`${platform}Handle`);
      if (card) {
        card.href = data.url;
        card.rel = 'noopener noreferrer';
        card.target = '_blank';
        card.setAttribute('aria-label', `Visit our ${platform} page`);
      }
      if (handle) handle.textContent = data.handle;
    }
  }

  /* ========= Scroll / Resize ========= */
  onScroll() {
    this.updateNavbar();
    this.updateProgress();
    this.updateActiveNavLink();
    this.applyParallax();
  }

  updateNavbar() {
    if (!this.navbar) return;
    const y = window.pageYOffset || document.documentElement.scrollTop;
    this.navbar.classList.toggle('scrolled', y > 50);
  }

  updateProgress() {
    if (!this.navProgress) return;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = Math.min(100, (scrollTop / (docH || 1)) * 100);
    this.navProgress.style.width = `${pct}%`;
  }

  updateActiveNavLink() {
    if (!this.navLinks) return;
    const sections = document.querySelectorAll('section[id]');
    const center = (window.pageYOffset || 0) + window.innerHeight / 2;
    let closest = { id: 'home', dist: Infinity };

    sections.forEach(sec => {
      const r = sec.getBoundingClientRect();
      const top = window.pageYOffset + r.top;
      const mid = top + r.height / 2;
      const d = Math.abs(mid - center);
      if (d < closest.dist) closest = { id: sec.id, dist: d };
    });

    this.setActiveLink(closest.id);
  }

  onResize() {
    // Close mobile menu when switching to desktop
    if (window.innerWidth > 768) this.closeNavMenu();
    // Recompute progress and active section
    this.onScroll();
  }

  /* ========= Visibility / Performance ========= */
  handleVisibilityChange() {
    this.parallaxEnabled = !document.hidden;
  }

  /* ========= Animations ========= */
  initializeAnimations() {
    // Intersection fade-in
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) e.target.classList.add('animate-in');
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

      document.querySelectorAll('.feature-card, .project-card, .contact-card, .social-card')
        .forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'opacity .6s ease, transform .6s ease';
          io.observe(el);
        });

      // Add CSS once
      if (!document.getElementById('dynamic-animations')) {
        const style = document.createElement('style');
        style.id = 'dynamic-animations';
        style.textContent = `.animate-in{opacity:1 !important; transform:translateY(0) !important;}`;
        document.head.appendChild(style);
      }
    }

    // Parallax
    this.parallaxEnabled = true;
  }

  applyParallax() {
    if (!this.parallaxEnabled || !this.heroLogo) return;
    // light parallax: transform only
    const y = (window.pageYOffset || 0) * 0.15; // slower for better feel
    this.heroLogo.style.transform = `translateY(${y}px)`;
  }

  /* ========= Utils ========= */
  throttle(fn, delay) {
    let last = 0, timer;
    return (...args) => {
      const now = Date.now();
      const remaining = delay - (now - last);
      if (remaining <= 0) {
        last = now;
        fn.apply(this, args);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => {
          last = Date.now();
          fn.apply(this, args);
        }, remaining);
      }
    };
  }

  destroy() {
    window.removeEventListener('scroll', this.onScrollThrottled);
    window.removeEventListener('resize', this.onResizeThrottled);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    this.isInitialized = false;
  }
}

/* Init */
const app = new TartarusApp();
if (typeof window !== 'undefined') window.TartarusApp = app;
export default TartarusApp;
