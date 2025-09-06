# Tartarus Studio Website

A modern cyberpunk-themed frontend website for a game development studio. This project features a sleek, responsive design with neon aesthetics built with pure HTML, CSS, and JavaScript.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Frontend Customization](#frontend-customization)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Cyberpunk Aesthetic:** Neon colors, glitch effects, scan lines, and animated particles
- **Customizable Navigation:** HOME, ABOUT, PROJECTS, CONTACT sections
- **Responsive Design:** Works perfectly on desktop and mobile devices
- **Accessibility:** ARIA roles, keyboard navigation, reduced motion support
- **Pure Frontend:** No backend dependencies, easy to deploy anywhere
- **Live Reload:** Development server with automatic refresh

---

## Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Dev Tools:** live-server for development
- **Deployment:** Static hosting ready (GitHub Pages, Netlify, Vercel, etc.)

---

## Getting Started

### Prerequisites
- Node.js >= 18.x (for development server only)
- npm >= 9.x

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# or
npm start
```

This will start a live-reload development server at `http://localhost:3000`

### Static Deployment
Since this is a frontend-only application, you can deploy it to any static hosting service:
- **GitHub Pages**: Push to a repository and enable Pages
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your repository for automatic deployments
- **Traditional hosting**: Upload files to any web server

---

## Frontend Customization
- Edit `index.html` for content and navigation
- Modify styles in `style/styles.css` for colors, fonts, and effects
- Update scripts in `src/app.js` for interactivity
- Replace assets in `assets/` folder with your own logos and images

---

## Scripts
- `npm start` - Start development server
- `npm run dev` - Start development server with live reload
- `npm run serve` - Serve the application
- `npm run build` - Build check (frontend-only, no build needed)

---

## Project Structure
```
index.html       # Main entry point
style/           # CSS styles and themes
src/             # JavaScript functionality
assets/          # Images, logos, and static assets
manifest.webmanifest # PWA configuration
service-worker.js     # Service worker for PWA
  style/           # CSS styles and themes
  src/             # JavaScript functionality  
  assets/          # Images, logos, static files
package.json       # Project metadata and scripts
manifest.webmanifest # Progressive Web App config
service-worker.js    # Service worker for PWA
```

---

## Accessibility
- ARIA roles and labels
- Keyboard navigation support
- Reduced motion preferences respected
- High contrast color schemes
- Screen reader compatibility

---

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License
This project is licensed under the MIT License.

---

## Customization Tips
- **Color Themes**: Modify CSS custom properties in `style/styles.css`
- **Content**: Update sections in `index.html` with your own information
- **Assets**: Replace images in `assets/` with your own branding
- **Animations**: Adjust CSS animations and transitions for your preferred feel
- **Progressive Web App**: Customize `manifest.webmanifest` for your brand

---

## Deployment Examples

### GitHub Pages
```bash
# Push to main branch, enable Pages in repository settings
git push origin main
```

### Netlify
```bash
# Drag and drop project folder to Netlify dashboard
# Or connect your Git repository for automatic deploys
```

### Vercel
```bash
# Install Vercel CLI and deploy
npm i -g vercel
vercel
```

---

## Contact
For questions or support, reach out at studio@tartarus.dev
