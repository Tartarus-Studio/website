/**
 * Projects Configuration
 * Centralized management of all game projects
 */

export const PROJECTS_DATA = [
  {
    id: 'tartarus-pyreleus',
    title: {
      en: 'Tartarus: Pyréleus',
      ar: 'تارتاروس: بيريليوس'
    },
    status: {
      en: 'In Development',
      ar: 'قيد التطوير'
    },
    genre: {
      en: 'Action-adventure survival explorational horror',
      ar: 'رعب استكشافي للبقاء والمغامرة والحركة'
    },
    platforms: {
      en: 'Cross-platform: Windows, Linux, macOS',
      ar: 'متعدد المنصات: ويندوز، لينكس، ماك أو إس'
    },
    subtitle: {
      en: 'Echoes of the Abyss',
      ar: 'أصداء الهاوية'
    },
    description: {
      en: 'Rogue-lite exploration through procedural underworld temples with diegetic HUD design',
      ar: 'استكشاف روج لايت عبر معابد العالم السفلي الإجرائية مع تصميم واجهة مستخدم ديجيتيك'
    },
    tags: ['Unity', 'PC', '2025'],
    image: './assets/works/work-1.webp',
    link: '#',
    featured: true,
    order: 1
  },
  // Example of how to add more projects:
  /*
  {
    id: 'project-two',
    title: {
      en: 'Project Name 2',
      ar: 'اسم المشروع 2'
    },
    status: {
      en: 'Coming Soon',
      ar: 'قريباً'
    },
    genre: {
      en: 'Strategy RPG',
      ar: 'لعبة استراتيجية تقمص أدوار'
    },
    platforms: {
      en: 'PC, Console',
      ar: 'الحاسوب، الكونسول'
    },
    subtitle: {
      en: 'Epic Adventure',
      ar: 'مغامرة ملحمية'
    },
    description: {
      en: 'An epic strategy RPG with deep storytelling',
      ar: 'لعبة استراتيجية ملحمية مع قصة عميقة'
    },
    tags: ['Unreal', 'Console', '2026'],
    image: './assets/works/work-2.webp',
    link: '#',
    featured: false,
    order: 2
  }
  */
];

export const PROJECT_CONFIG = {
  // Dynamic layout settings
  LAYOUT: {
    // Grid settings for different project counts
    SINGLE_PROJECT: {
      GRID_COLUMNS: '1fr',
      JUSTIFY_CONTENT: 'center',
      MAX_WIDTH: '500px',
      MARGIN: '0 auto'
    },
    TWO_PROJECTS: {
      GRID_COLUMNS: 'repeat(2, 1fr)',
      JUSTIFY_CONTENT: 'center',
      MAX_WIDTH: '1000px',
      MARGIN: '0 auto'
    },
    MULTIPLE_PROJECTS: {
      GRID_COLUMNS: 'repeat(auto-fit, minmax(350px, 1fr))',
      JUSTIFY_CONTENT: 'start',
      MAX_WIDTH: '120rem',
      MARGIN: '0 auto'
    }
  },
  
  // Animation settings
  CARD_ANIMATION_DELAY: 100, // ms between each card animation
  HOVER_TRANSITION_DURATION: 300,
  
  // Layout settings
  CARD_MIN_HEIGHT: '500px',
  GRID_GAP: '2rem',
  
  // Status colors
  STATUS_COLORS: {
    'In Development': '#22c55e',
    'Coming Soon': '#f59e0b',
    'Released': '#3b82f6',
    'On Hold': '#ef4444',
    'قيد التطوير': '#22c55e',
    'قريباً': '#f59e0b',
    'صدر': '#3b82f6',
    'متوقف': '#ef4444'
  }
};
