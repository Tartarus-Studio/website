# Tartarus Studio - Architecture Documentation

## Overview

The Tartarus Studio website is built with a clean, modular architecture that separates concerns and makes the codebase maintainable and scalable.

## Directory Structure

```
src/
├── config/              # Configuration files
│   ├── constants.js     # Application constants
│   ├── urls.js         # URLs and endpoints
│   └── index.js        # Config exports
├── modules/            # Feature modules
│   ├── TranslationManager.js
│   ├── NavigationManager.js
│   ├── SocialManager.js
│   ├── EmailManager.js
│   ├── AnimationManager.js
│   └── Utils.js
├── translations/       # Language files
│   ├── en.json
│   └── ar.json
├── utils/             # Utility functions
│   └── logger.js
├── TartarusApp.js     # Main application class
└── main.js           # Entry point
```

## Architecture Principles

### 1. Separation of Concerns
- **Config**: All constants, URLs, and settings in dedicated files
- **Modules**: Feature-specific functionality in separate classes
- **Utils**: Reusable helper functions
- **Translations**: Internationalization data

### 2. Modular Design
Each module handles a specific aspect:
- `TranslationManager`: Language switching and i18n
- `NavigationManager`: Menu, scrolling, and navigation
- `SocialManager`: Social media links and interactions
- `EmailManager`: Email copying functionality
- `AnimationManager`: Animations, parallax, and visual effects

### 3. Configuration-Driven
- All URLs, constants, and settings in config files
- Easy to modify without touching application logic
- Environment-specific configurations possible

### 4. ES6 Modules
- Modern JavaScript module system
- Tree-shaking support for smaller bundles
- Clear dependency management

## Configuration System

### Constants (`src/config/constants.js`)
- Application settings
- Performance configurations
- UI constants
- Storage keys
- CSS class names
- Element IDs

### URLs (`src/config/urls.js`)
- Social media URLs
- API endpoints
- Asset URLs
- External links
- Contact information

## Module System

### TranslationManager
Handles all internationalization:
- Loading translation files
- Language switching
- RTL/LTR support
- DOM element translation

### NavigationManager
Manages navigation functionality:
- Mobile menu toggle
- Smooth scrolling
- Active link highlighting
- Scroll progress
- Responsive behavior

### SocialManager
Handles social media integration:
- Link setup and configuration
- Platform-specific handling
- URL and handle management

### EmailManager
Manages email functionality:
- Clipboard operations
- Fallback support
- Visual feedback
- Error handling

### AnimationManager
Controls visual effects:
- Intersection Observer animations
- Parallax effects
- Image error handling
- Performance optimizations

## Usage Examples

### Adding a New Social Platform

1. Update `src/config/urls.js`:
```javascript
export const SOCIAL_URLS = {
  // ... existing platforms
  linkedin: {
    url: 'https://linkedin.com/company/tartarus-studio',
    handle: 'tartarus-studio'
  }
};
```

2. Add HTML elements with appropriate IDs
3. The `SocialManager` will automatically handle the setup

### Adding New Configuration

1. Add to `src/config/constants.js`:
```javascript
export const APP_CONFIG = {
  // ... existing config
  NEW_FEATURE: {
    ENABLED: true,
    TIMEOUT: 5000
  }
};
```

2. Import and use in modules:
```javascript
import { APP_CONFIG } from '../config/index.js';
// Use APP_CONFIG.NEW_FEATURE.ENABLED
```

### Creating New Modules

1. Create new file in `src/modules/`
2. Export a class with `init()` method
3. Add to `TartarusApp.js` constructor and initialization

## Performance Considerations

- Throttled scroll and resize handlers
- Intersection Observer for animations
- Lazy loading capabilities
- Efficient DOM caching
- Memory leak prevention

## Browser Support

- Modern ES6+ browsers
- Progressive enhancement
- Graceful fallbacks
- Mobile-first responsive design

## Development Guidelines

1. **Keep modules focused**: Each module should have a single responsibility
2. **Use configuration**: Avoid hardcoded values, use config files
3. **Handle errors gracefully**: Provide fallbacks and user feedback
4. **Maintain consistency**: Follow established patterns
5. **Document changes**: Update this file when adding new features
