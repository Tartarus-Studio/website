/* ===== Navigation & Smooth Scrolling ===== */
class Navigation {
  constructor() {
    this.menu = document.getElementById('menu');
    this.burger = document.getElementById('burger');
    this.progress = document.getElementById('navProgress');
    this.links = [...document.querySelectorAll('a[data-spy]')];
    this.sections = this.links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    
    this.init();
  }

  init() {
    this.setupScrollListeners();
    this.setupNavigation();
    this.setupMobileMenu();
    
    // Initial setup
    requestAnimationFrame(() => {
      this.setActiveByScroll();
      this.updateProgress();
    });
  }

  smoothScrollTo(targetY, duration = 650) {
    const startY = window.scrollY;
    const delta = targetY - startY;
    const t0 = performance.now();
    const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    
    const step = (now) => {
      const progress = Math.min(1, (now - t0) / duration);
      scrollTo(0, startY + delta * ease(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    
    requestAnimationFrame(step);
  }

  setupNavigation() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (!id?.startsWith('#')) return;
        
        e.preventDefault();
        const section = document.querySelector(id);
        if (!section) return;
        
        const offset = 68;
        const y = section.getBoundingClientRect().top + window.scrollY - offset;
        this.smoothScrollTo(y);
        this.closeMobileMenu();
        history.pushState(null, '', id);
      });
    });
  }

  setupScrollListeners() {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.setActiveByScroll();
          this.updateProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', () => this.setActiveByScroll());
  }

  setupMobileMenu() {
    this.burger?.addEventListener('click', () => {
      const isOpen = this.menu?.classList.toggle('open');
      this.burger.classList.toggle('open', isOpen);
      this.burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  closeMobileMenu() {
    this.menu?.classList.remove('open');
    this.burger?.classList.remove('open');
    this.burger?.setAttribute('aria-expanded', 'false');
  }

  setActiveByScroll() {
    const y = scrollY + 120;
    let active = this.links[0];
    
    this.sections.forEach((section, i) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (y >= top && y < bottom) active = this.links[i];
    });
    
    this.links.forEach(link => link.classList.toggle('active', link === active));
  }

  updateProgress() {
    const { scrollHeight, clientHeight } = document.documentElement;
    const height = scrollHeight - clientHeight;
    this.progress.style.width = height > 0 ? `${(scrollY / height) * 100}%` : '0%';
  }
}

/* ===== Social & Email Configuration ===== */
class SocialConfig {
  constructor() {
    this.init();
  }

  async init() {
    await this.loadPublicConfig();
    this.setupEmailCopy();
  }

  async loadPublicConfig() {
    try {
      const res = await fetch('http://localhost:3000/api/public');
      if (!res.ok) return;
      const config = await res.json();
      
      this.updateSocialLinks(config);
      this.updateUsernames(config);
    } catch (error) {
      console.warn('Failed to load public config:', error);
    }
  }

  updateSocialLinks(config) {
    const links = [
      { id: 'xLink', cardId: 'xCard', url: config?.social?.x },
      { id: 'discordLink', cardId: 'discordCard', url: config?.social?.discord },
      { id: 'ytLink', cardId: 'ytCard', url: config?.social?.youtube },
      { id: 'gitLink', cardId: 'gitCard', url: config?.social?.github }
    ];

    links.forEach(({ id, cardId, url }) => {
      if (url) {
        document.getElementById(id)?.setAttribute('href', url);
        document.getElementById(cardId)?.setAttribute('href', url);
      }
    });
  }

  updateUsernames(config) {
    const extractUsername = (url) => 
      url?.replace(/^https?:\/\/(www\.)?/, '').replace(/\/+$/, '').split('/').pop() || '';

    const usernames = {
      x: config?.usernames?.x || extractUsername(config?.social?.x),
      discord: config?.usernames?.discord || extractUsername(config?.social?.discord),
      youtube: config?.usernames?.youtube || extractUsername(config?.social?.youtube),
      github: config?.usernames?.github || extractUsername(config?.social?.github)
    };

    Object.entries(usernames).forEach(([platform, username]) => {
      const handle = username ? `@${username}` : '';
      const userEl = document.getElementById(`${platform}User`);
      const userCardEl = document.getElementById(`${platform}UserCard`);
      if (userEl) userEl.textContent = handle;
      if (userCardEl) userCardEl.textContent = handle;
    });
  }

  setupEmailCopy() {
    const copyBtn = document.getElementById('copyEmail');
    const emailEl = document.getElementById('studioEmail');
    
    copyBtn?.addEventListener('click', async () => {
      if (!emailEl) return;
      
      try {
        const emailText = emailEl.querySelector('span')?.textContent || emailEl.textContent;
        await navigator.clipboard.writeText(emailText.trim());
        this.showCopyFeedback(copyBtn, 'Copied!');
      } catch {
        this.showCopyFeedback(copyBtn, 'Copy failed');
      }
    });
  }

  showCopyFeedback(button, message) {
    const originalText = button.innerHTML;
    button.innerHTML = `<span class="material-icons">check</span> ${message}`;
    setTimeout(() => {
      button.innerHTML = originalText;
    }, 1400);
  }
}

/* ===== Application Initialization ===== */
class TartarusApp {
  constructor() {
    this.navigation = new Navigation();
    this.socialConfig = new SocialConfig();
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TartarusApp();
});
