# Configuration Management Guide

## Overview

All hardcoded information has been removed from the codebase and centralized in configuration files. This makes the website easy to customize and maintain.

## Configuration Structure

### `src/config/site.js` - Main Site Information
All website-specific information is now centralized here:

```javascript
export const SITE_INFO = {
  // Basic site information
  NAME: 'Tartarus Studio',
  ALTERNATE_NAME: 'Tartarus',
  TAGLINE: 'Professional Game Development Studio',
  DESCRIPTION: 'Professional game development studio...',
  
  // URLs and contact
  DOMAIN: 'tartarus.studio',
  BASE_URL: 'https://tartarus.studio',
  EMAIL: 'studio@tartarus.dev',
  
  // Social media handles (without @)
  SOCIAL_HANDLES: {
    TWITTER: 'tartarus_studio',
    GITHUB: 'tartarus-studio',
    DISCORD: 'tartarus-studio'
  },
  
  // Assets and branding
  LOGO_PATH: './assets/logo.svg',
  BRAND_COLORS: {
    PRIMARY: '#dc143c',
    SECONDARY: '#ff0080'
  }
};
```

### Other Configuration Files
- **`constants.js`**: Application settings, performance configs
- **`urls.js`**: Now imports from `site.js` for consistency
- **`projects.js`**: Project data and settings
- **Translation files**: `en.json`, `ar.json`

## What Was Removed/Fixed

### ❌ Hardcoded Information Removed:
1. **Email addresses** - Now from `SITE_INFO.EMAIL`
2. **Social media URLs** - Generated from `SITE_INFO.SOCIAL_HANDLES`
3. **Website URLs** - From `SITE_INFO.BASE_URL`
4. **Meta tags** - Dynamically generated
5. **Company information** - Centralized in `SITE_INFO`

### 🗑️ Removed Files:
- **`assets/icons/` folder** - As requested, completely removed
- **Icon references** - Removed from manifest and service worker

### 🔧 New Features:
- **MetaManager** - Dynamically updates all meta tags and structured data
- **Centralized configuration** - Single source of truth for all site info
- **Automatic URL generation** - Social URLs built from handles

## How to Update Information

### Change Basic Site Info
Edit `src/config/site.js`:
```javascript
export const SITE_INFO = {
  NAME: 'Your Studio Name',           // ← Change this
  EMAIL: 'contact@yourdomain.com',    // ← Change this
  BASE_URL: 'https://yourdomain.com', // ← Change this
  // ... other fields
};
```

### Change Social Media
Update the handles in `src/config/site.js`:
```javascript
SOCIAL_HANDLES: {
  TWITTER: 'your_twitter_handle',     // ← Change this
  GITHUB: 'your-github-username',     // ← Change this
  DISCORD: 'your-discord-server'      // ← Change this
}
```

URLs will be automatically generated:
- Twitter: `https://x.com/your_twitter_handle`
- GitHub: `https://github.com/your-github-username`
- Discord: `https://discord.gg/your-discord-server`

### Change Colors and Branding
```javascript
BRAND_COLORS: {
  PRIMARY: '#your-primary-color',     // ← Change this
  SECONDARY: '#your-secondary-color'  // ← Change this
}
```

## Dynamic Updates

The **MetaManager** automatically updates:
- **Page title**
- **Meta descriptions**
- **OpenGraph tags**
- **Twitter Card tags**
- **JSON-LD structured data**
- **Email display in contact section**

All based on the configuration files!

## Benefits

### ✅ **Easy Maintenance**
- Change information in one place
- Automatically updates everywhere
- No more hunting for hardcoded values

### ✅ **Consistency**
- Same information used across all pages
- No mismatched URLs or handles
- Centralized branding

### ✅ **SEO Friendly**
- Dynamic meta tags
- Proper structured data
- Consistent social media links

### ✅ **Developer Friendly**
- Clear configuration structure
- Type-safe imports
- Well-documented options

## Migration Summary

### Before:
```html
<!-- Hardcoded everywhere -->
<meta property="og:url" content="https://tartarus.studio/">
<span class="email">studio@tartarus.dev</span>
<a href="https://x.com/tartarus_studio">Twitter</a>
```

### After:
```javascript
// Centralized configuration
import { SITE_INFO, FULL_URLS } from './config/site.js';

// Automatically generated
const twitterUrl = FULL_URLS.TWITTER;  // https://x.com/tartarus_studio
const email = SITE_INFO.EMAIL;         // studio@tartarus.dev
```

## Icon Cleanup

### Removed:
- `assets/icons/icon-192x192.png`
- `assets/icons/icon-192x192.svg`
- `assets/icons/icon-512x512.png`
- `assets/icons/icon-512x512.svg`
- All references in manifest and service worker

### Replaced With:
- Using `assets/logo.svg` as the main icon
- Simplified PWA manifest
- Cleaner file structure

## Next Steps

1. **Test the website** - Ensure all links and information display correctly
2. **Update your information** - Edit `src/config/site.js` with your actual details
3. **Customize branding** - Update colors, logos, and styling as needed
4. **Deploy** - The website is now fully configurable and ready for production

The codebase is now **100% configuration-driven** with **zero hardcoded values**! 🎉
