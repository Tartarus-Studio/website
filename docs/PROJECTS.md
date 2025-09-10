# Projects Management Guide

## Overview

The projects section is now fully scalable and configurable. You can easily add, modify, or remove projects without touching the HTML or CSS code.

## Adding New Projects

### Step 1: Edit the Projects Configuration

Open `src/config/projects.js` and add your new project to the `PROJECTS_DATA` array:

```javascript
export const PROJECTS_DATA = [
  // Existing project...
  {
    id: 'tartarus-pyreleus',
    title: {
      en: 'Tartarus: Pyréleus',
      ar: 'تارتاروس: بيريليوس'
    },
    // ... existing project data
  },
  
  // ADD YOUR NEW PROJECT HERE:
  {
    id: 'your-new-game',                    // Unique identifier
    title: {
      en: 'Your Game Title',               // English title
      ar: 'عنوان لعبتك'                    // Arabic title
    },
    status: {
      en: 'Coming Soon',                   // Development status
      ar: 'قريباً'
    },
    genre: {
      en: 'Action RPG',                    // Game genre
      ar: 'لعبة حركة وتقمص أدوار'
    },
    platforms: {
      en: 'PC, PlayStation, Xbox',         // Target platforms
      ar: 'الحاسوب، بلايستيشن، إكسبوكس'
    },
    subtitle: {
      en: 'Epic Adventure Awaits',         // Subtitle/tagline
      ar: 'مغامرة ملحمية في الانتظار'
    },
    description: {
      en: 'An epic action RPG with...',    // Brief description
      ar: 'لعبة حركة وتقمص أدوار ملحمية...'
    },
    tags: ['Unreal', 'Console', '2026'],   // Technology/platform tags
    image: './assets/works/your-game.webp', // Project image path
    link: '#',                             // Link to project page
    featured: true,                        // Show as featured?
    order: 2                               // Display order (1, 2, 3...)
  }
];
```

### Step 2: Add Project Image

1. Add your project image to `assets/works/`
2. Recommended format: WebP for better performance
3. Recommended size: 800x600px or similar aspect ratio
4. Update the `image` path in your project configuration

### Step 3: That's It!

The project will automatically appear on the website. No HTML or CSS changes needed!

## Project Configuration Options

### Required Fields

- `id`: Unique identifier (string)
- `title`: Object with `en` and `ar` translations
- `status`: Object with `en` and `ar` translations
- `genre`: Object with `en` and `ar` translations
- `platforms`: Object with `en` and `ar` translations
- `subtitle`: Object with `en` and `ar` translations
- `description`: Object with `en` and `ar` translations
- `tags`: Array of strings
- `image`: Path to project image
- `link`: URL or anchor link
- `featured`: Boolean
- `order`: Number for display order

### Status Options

Common status values (customize as needed):
- `"In Development"` / `"قيد التطوير"`
- `"Coming Soon"` / `"قريباً"`
- `"Released"` / `"صدر"`
- `"On Hold"` / `"متوقف"`

Each status has a corresponding color in `PROJECT_CONFIG.STATUS_COLORS`.

### Tags

Common tags to use:
- Technology: `"Unity"`, `"Unreal"`, `"Godot"`, `"Custom Engine"`
- Platform: `"PC"`, `"Console"`, `"Mobile"`, `"VR"`
- Year: `"2024"`, `"2025"`, `"2026"`

## Customizing Display

### Layout Settings

In `src/config/projects.js`, modify `PROJECT_CONFIG`:

```javascript
export const PROJECT_CONFIG = {
  PROJECTS_PER_ROW: 3,        // Projects per row on desktop
  MOBILE_PROJECTS_PER_ROW: 1, // Projects per row on mobile
  CARD_MIN_HEIGHT: '500px',   // Minimum card height
  CARD_MAX_WIDTH: '400px',    // Maximum card width
  GRID_GAP: '2rem',           // Gap between cards
  
  // Animation settings
  CARD_ANIMATION_DELAY: 100,  // Delay between card animations (ms)
  
  // Status colors
  STATUS_COLORS: {
    'In Development': '#22c55e',  // Green
    'Coming Soon': '#f59e0b',     // Orange
    'Released': '#3b82f6',        // Blue
    'On Hold': '#ef4444'          // Red
    // Add Arabic translations with same colors
  }
};
```

## Managing Projects Programmatically

The `ProjectsManager` class provides methods for dynamic project management:

```javascript
// Get the projects manager instance
const app = window.TartarusApp;
const projectsManager = app.projectsManager;

// Add a new project
projectsManager.addProject({
  id: 'new-project',
  title: { en: 'New Game', ar: 'لعبة جديدة' },
  // ... other properties
});

// Update an existing project
projectsManager.updateProject('project-id', {
  status: { en: 'Released', ar: 'صدر' }
});

// Remove a project
projectsManager.removeProject('project-id');

// Get project data
const project = projectsManager.getProject('project-id');
const allProjects = projectsManager.getAllProjects();
const featuredProjects = projectsManager.getFeaturedProjects();
```

## Best Practices

### 1. Image Optimization
- Use WebP format for better compression
- Optimize images for web (800x600px recommended)
- Use descriptive alt text in multiple languages

### 2. Content Guidelines
- Keep descriptions concise but informative
- Use consistent terminology across projects
- Provide accurate release dates and platforms

### 3. Organization
- Use logical ordering (newest first, or by importance)
- Group similar projects together
- Use featured flag for your most important projects

### 4. Translations
- Always provide both English and Arabic translations
- Keep translations consistent in tone and style
- Consider cultural context for Arabic content

## Dynamic Layout System

The projects section automatically adapts its layout based on the number of projects:

### Layout Behavior:
- **1 Project**: Centered single card (max 450px width)
- **2 Projects**: Side-by-side centered layout (max 1000px total width)
- **3+ Projects**: Responsive grid with auto-fit columns

### Responsive Breakpoints:
- **Desktop**: Dynamic layout as described above
- **Tablet (768px-1199px)**: Maintains project count layout
- **Mobile (<768px)**: Always single column regardless of project count

### Smooth Transitions:
- All layout changes include smooth CSS transitions
- Cards animate in with staggered delays
- Hover effects and interactions remain consistent

## Performance

- Projects are rendered dynamically on page load
- Images use lazy loading
- Animations are staggered for smooth appearance
- Grid layout is optimized for all screen sizes

## Troubleshooting

### Project Not Appearing
1. Check the project ID is unique
2. Verify all required fields are present
3. Ensure image path is correct
4. Check browser console for errors

### Layout Issues
1. Verify image dimensions are consistent
2. Check that content lengths are reasonable
3. Test on different screen sizes

### Translation Issues
1. Ensure both `en` and `ar` keys are present
2. Check for special characters or encoding issues
3. Verify translation keys match expected format
