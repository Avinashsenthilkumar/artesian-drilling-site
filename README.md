# Artesian Drilling — full site

A React (Vite) rebuild of artesiandrilling.com, plus a small Express
backend for the "Request a Quote" form.

```
artesian-drilling-site/
├── frontend/              React + Vite + Tailwind app (all 4 pages)
│   └── src/App.jsx        Everything UI-related lives in this one file
├── backend/                Express server for the quote/contact forms
│   └── server.js          Routes + stubbed notification functions
├── download-images.sh      Pulls the real site photos into frontend/public/images
└── README.md               You are here
```

## 1. Get the real images

This step is optional but recommended — without it the site falls back to
broken image icons where photos should be, since the code expects local
files under `frontend/public/images/`.

```bash
cd artesian-drilling-site
chmod +x download-images.sh
./download-images.sh
```

This downloads every photo used on the site (hero, services, blog,
contact) straight from artesiandrilling.com into `frontend/public/images/`.

## 2. Run the backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Runs on `http://localhost:4000`. It logs incoming quote/contact
submissions to the console for now — see the `TODO` comments in
`server.js` for where to plug in email (nodemailer), a database, etc.

## 3. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`. The quote form on the Home page posts
to the backend at `http://localhost:4000/api/quote` by default. To point
it somewhere else (e.g. a deployed backend URL), create
`frontend/.env` with:

```
VITE_API_BASE=https://your-backend-url.com
```

## Pages included

- **Home** — hero, stats panel, 6-service grid, sustainability split,
  latest works, quote form + FAQ
- **Services** — recent blog cards, drilling process copy, FAQ, service
  breakdown
- **About** — company overview, feature cards, stats, "Why Communities
  Trust Us"
- **Contact** — service overview, embedded Google Map, contact details

Navigation between pages is handled with simple React state in
`App.jsx` (no react-router dependency needed) — click Home/Services/
About/Contact in the header and it swaps the page instantly.

## Deploying

- **Frontend**: `npm run build` inside `frontend/` produces a static
  `dist/` folder — deploy that to Netlify, Vercel, GitHub Pages, or any
  static host.
- **Backend**: deploy `backend/` to any Node host (Render, Railway,
  Fly.io, a VPS, etc.) and set `VITE_API_BASE` in the frontend to match.
