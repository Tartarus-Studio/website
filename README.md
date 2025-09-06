# Tartarus Studio Website

A fully customizable cyberpunk-themed website for a game development studio. This project features a modern frontend with neon aesthetics and a robust backend API, all built with pure HTML, CSS, JavaScript, and Node.js/Express.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Frontend Customization](#frontend-customization)
- [Backend API](#backend-api)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Accessibility](#accessibility)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- **Cyberpunk Aesthetic:** Neon colors, glitch effects, scan lines, and animated particles
- **Customizable Navigation:** SYSTEM, DATA, PROJECTS, CONNECT sections
- **Responsive Design:** Works on desktop and mobile
- **Accessibility:** ARIA roles, keyboard navigation, reduced motion support
- **Backend API:** Express server with email functionality
- **Environment Config:** Easily switch between development and production

---

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript (no external libraries)
- **Backend:** Node.js, Express, Nodemailer
- **Dev Tools:** live-server, nodemon, concurrently

---

## Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- SMTP email provider (Gmail, etc.)

### Installation
```bash
npm install
```

### Running the Frontend
```bash
npx live-server ./frontend --open=index.html
```

### Running the Backend
```bash
npm run dev
```

---

## Frontend Customization
- Edit `frontend/index.html` for content and navigation
- Modify styles in `frontend/style/style.css` for colors, fonts, and effects
- Update scripts in `frontend/src/app.js` for interactivity

---

## Backend API
- Main entry: `backend/server.js`
- Routes: `backend/routes/`
- Contact form with email delivery
- Health check endpoint

---

## Environment Variables
Copy `.env.example` to `.env` and fill in your email settings:
```
STUDIO_MAIL_TO=studio@yourdomain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## Scripts
- `npm start` - Run backend in production mode
- `npm run dev` - Run backend with nodemon for development
- `npx live-server ./frontend` - Run frontend dev server

---

## Project Structure
```
backend/         # Express server and API
  routes/        # API endpoints
  server.js      # Main server file
frontend/        # HTML, CSS, JS for website
  index.html     # Main entry point
  style/         # CSS styles
  src/           # JS scripts
  assets/        # Images, fonts, etc.
.env             # Environment configuration
package.json     # Project metadata and scripts
```

---

## Accessibility
- ARIA roles and labels
- Keyboard navigation
- Reduced motion support

---

## Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License
This project is licensed under the ISC License.

---

## Customization Tips
- Change color palette in CSS for different themes
- Swap fonts in `style.css` for a new look
- Add new API routes in `backend/routes/`
- Configure email templates in `backend/routes/contact.js`

---

## Contact
For questions or support, reach out at [dev@tartarus.studio].
