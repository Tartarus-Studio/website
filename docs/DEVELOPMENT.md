# Development Guide

## Quick Start

1. **Clone and Setup**
   ```bash
   git clone <repository>
   cd tarta
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   # or
   npm start
   ```

3. **Open in Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
├── src/
│   ├── config/           # Configuration files
│   │   ├── constants.js  # App constants and settings
│   │   ├── urls.js      # URLs, endpoints, and links
│   │   └── index.js     # Config exports
│   ├── modules/         # Feature modules
│   │   ├── TranslationManager.js  # i18n functionality
│   │   ├── NavigationManager.js   # Navigation & scrolling
│   │   ├── SocialManager.js       # Social media links
│   │   ├── EmailManager.js        # Email functionality
│   │   ├── AnimationManager.js    # Animations & effects
│   │   └── Utils.js              # Utility functions
│   ├── translations/   # Language files
│   │   ├── en.json     # English translations
│   │   └── ar.json     # Arabic translations
│   ├── utils/          # Utility classes
│   │   └── logger.js   # Logging utility
│   ├── TartarusApp.js  # Main application class
│   └── main.js         # Application entry point
├── style/
│   └── styles.css      # All CSS styles
├── assets/             # Images, icons, media
├── docs/               # Documentation
└── index.html          # Main HTML file
```

## Configuration Management

### Adding New Constants

Edit `src/config/constants.js`:
```javascript
export const APP_CONFIG = {
  // Add your constants here
  NEW_FEATURE: {
    ENABLED: true,
    TIMEOUT: 5000
  }
};
```

### Adding New URLs

Edit `src/config/urls.js`:
```javascript
export const SOCIAL_URLS = {
  // Add new social platform
  platform: {
    url: 'https://platform.com/handle',
    handle: '@handle'
  }
};
```

## Module Development

### Creating a New Module

1. Create file in `src/modules/YourModule.js`
2. Follow this template:

```javascript
import { APP_CONFIG } from '../config/index.js';

export class YourModule {
  constructor() {
    // Initialize properties
  }

  init() {
    // Setup functionality
  }

  // Add your methods here
}
```

3. Add to `TartarusApp.js`:
```javascript
import { YourModule } from './modules/YourModule.js';

// In constructor:
this.yourModule = new YourModule();

// In onDOMReady:
this.yourModule.init();
```

## Translation System

### Adding New Languages

1. Create `src/translations/[lang].json`
2. Add language to `APP_CONFIG.SUPPORTED_LANGUAGES`
3. Add to RTL list if needed: `APP_CONFIG.RTL_LANGUAGES`

### Adding New Translation Keys

Update all language files with the same structure:
```json
{
  "section": {
    "subsection": {
      "key": "Translated text"
    }
  }
}
```

Use in HTML:
```html
<element data-translate="section.subsection.key">Default text</element>
```

## Styling Guidelines

### CSS Organization
- All styles in `style/styles.css`
- Organized by sections with clear comments
- CSS custom properties for consistency
- Mobile-first responsive design

### Adding New Styles
1. Add CSS custom properties to `:root` if needed
2. Follow existing naming conventions
3. Add RTL support for new components
4. Test on mobile devices

## Performance Best Practices

1. **Throttled Events**: Use `Utils.throttle()` for scroll/resize
2. **Lazy Loading**: Implement for images and heavy content
3. **Module Loading**: Only load what's needed
4. **Caching**: Leverage browser caching for assets

## Testing

### Browser Testing
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers

### Feature Testing
- Language switching
- Navigation functionality
- Email copying
- Responsive design
- Accessibility

## Deployment

### Build Process
```bash
npm run build
```

### Deployment Options
- GitHub Pages
- Netlify
- Vercel
- Traditional hosting

See `DEPLOYMENT.md` for detailed instructions.

## Troubleshooting

### Common Issues

1. **Module Import Errors**
   - Ensure `package.json` has `"type": "module"`
   - Check file extensions in imports

2. **Translation Not Loading**
   - Check browser console for network errors
   - Verify JSON syntax in translation files

3. **Styles Not Applying**
   - Check CSS syntax
   - Verify class names match
   - Test in different browsers

### Debug Mode

Open browser console to see debug information:
- Translation loading status
- Module initialization
- Error messages

## Contributing

1. Follow existing code patterns
2. Update documentation
3. Test thoroughly
4. Use meaningful commit messages
5. Keep changes focused and atomic
