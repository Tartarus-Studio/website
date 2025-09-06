# Deployment Guide

This is a frontend-only static website that can be deployed to any static hosting service.

## Quick Deployment Options

### 1. GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages in your repository
3. Select source as "Deploy from branch"
4. Choose "main" branch and "/ (root)" folder
5. Your site will be available at `https://yourusername.github.io/repository-name`

### 2. Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop your project folder to the deploy area
3. Your site will be live instantly with a random URL
4. Optional: Connect to Git for automatic deployments

### 3. Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in your project directory
3. Follow the prompts
4. Your site will be deployed with automatic HTTPS

### 4. Traditional Web Hosting
1. Upload all files to your web server's public directory
2. Ensure `index.html` is in the root
3. Configure your server to serve static files

## Files to Deploy
- `index.html` (main entry point)
- `style/` (CSS files)
- `src/` (JavaScript files)
- `assets/` (images and static files)
- `manifest.webmanifest` (PWA config)
- `service-worker.js` (PWA functionality)

## Development Server
For local development, run:
```bash
npm start
```

This starts a Python HTTP server on port 3000.

## Build Process
No build process is needed - this is pure HTML/CSS/JavaScript that runs directly in the browser.
