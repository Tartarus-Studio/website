<<<<<<< HEAD
# Tartarus Studio website

> https://tartarus.studio

---

main branch is hosted to https://tartarus-studio.github.io/website/
=======
# Tartarus Monorepo

Full-stack web application monorepo containing a Next.js 14 (TypeScript) frontend with Tailwind CSS + shadcn/ui and an Express (TypeScript) backend API.

## Structure
```
frontend/   # Next.js 14 App Router project (TypeScript, Tailwind, shadcn/ui)
backend/    # Express API (TypeScript)
```

## Prerequisites
- Node.js LTS (v18+ recommended)
- npm (comes with Node)

## Initial Setup
Install dependencies for each project:
```bash
# From repository root
cd frontend && npm install
cd ../backend && npm install
```
(They were already installed when scaffolded, but re-run if needed.)

## Running in Development
### Frontend (Next.js)
```bash
cd frontend
npm run dev
# App available at http://localhost:3000
```

### Backend (Express API)
```bash
cd backend
npm run dev
# API available at http://localhost:4000
# Health check: http://localhost:4000/health
```

### Concurrent Dev (Optional)
You can use two terminals, one per service. If you prefer a single command, you can add a root package.json with a script using `npm-run-all` or `concurrently` later.

## Building for Production
```bash
# Frontend
cd frontend
npm run build

# Backend
cd backend
npm run build
```
Frontend output goes to `.next/`, backend compiled JS to `dist/`.

## Environment Variables
Copy `.env.example` to `.env` files as needed (not yet created). The backend currently supports `PORT`.

## Adding shadcn/ui Components
Inside `frontend`:
```bash
npx shadcn add button
```
Replace `button` with any component listed at https://ui.shadcn.com.

## API Example
GET `http://localhost:4000/api/greeting` returns JSON:
```json
{ "message": "Hello from Express API" }
```

## Git Version Control
A `.gitignore` file is included. Initialize (if not already) and make the first commit:
```bash
git init
git add .
git commit -m "chore: initial monorepo setup"
```
(Next.js init already created a git repo inside `frontend`; you may remove its `.git` folder to manage one repo at the root.)

To remove the nested git:
```bash
# From frontend directory
rm -rf .git  # Windows PowerShell: Remove-Item -Recurse -Force .git
# Then run git init at root as above
```

## Next Steps / Ideas
- Add root `package.json` and shared tooling (ESLint, Prettier, Turborepo) for better DX.
- Dockerize both services.
- Add reverse proxy (e.g., nginx or a Next.js rewrite) for unified origin.
- Implement authentication (JWT or NextAuth.js).

---
Happy hacking!
>>>>>>> 60178a0 (chore: initial monorepo setup (frontend + backend))
