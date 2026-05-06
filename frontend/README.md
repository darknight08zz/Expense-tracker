# Frontend – Expense Tracker

This directory contains the **React** front‑end of the Expense Tracker application. It provides a sleek, premium UI with glass‑morphism effects, smooth micro‑animations, and a responsive layout that works on desktop and mobile.

---

## 🛠️ Tech Stack

- **React 18** – component‑based UI library.
- **Vite / Create‑React‑App** – fast development server with hot‑module replacement.
- **JavaScript (JSX)** – UI logic.
- **Vanilla CSS** – custom design system (no Tailwind, no external UI frameworks).  Styles are built with CSS variables for colors, spacing, and typography to keep the visual language consistent.
- **Google Fonts – Inter** – modern, readable typeface.
- **Axios** – for HTTP communication with the FastAPI backend.

---

## 📦 Getting Started

### Prerequisites

- **Node.js** (>=14) and **npm** installed.
- The backend must be running (see the root `README.md` for backend setup).

### Install dependencies

```bash
cd frontend
npm install
```

### Development server

```bash
npm start
```

The app will be available at **http://localhost:3000** and automatically proxies API calls to the backend (configured in `vite.config.js` or CRA’s proxy settings).

### Build for production

```bash
npm run build
```

The production assets are emitted to the `dist/` folder. You can serve these static files with any web server or embed them in the FastAPI backend.

---

## 🎨 Design Highlights

- **Glass‑morphism cards** for the dashboard and expense list.
- **Subtle hover animations** on buttons and inputs.
- **Responsive grid** that collapses to a single column on narrow screens.
- **Dynamic loading spinners** appear while AI categorization is in progress.

All styles live in `src/index.css` and component‑specific CSS modules under `src/styles/`.

---

## 📂 Project Structure (frontend)

```
frontend/
├─ public/                 # static assets (favicon, index.html)
├─ src/
│   ├─ components/         # reusable UI components (Dashboard, ExpenseForm, …)
│   ├─ services/           # API wrapper using axios
│   ├─ styles/             # CSS files and design tokens
│   ├─ App.jsx             # root component & routing
│   ├─ index.js            # entry point, imports global CSS & font
│   └─ index.css           # global style sheet (variables, resets)
├─ .gitignore
├─ package.json
└─ README.md               # ← you are here!
```

---

## 🚀 Running the Full Stack Locally

1. **Start the backend** (`cd backend && uvicorn main:app --reload`).
2. **Start the frontend** (`cd frontend && npm start`).
3. Open `http://localhost:3000` in a browser.

The UI will communicate with the API at `http://localhost:8000/api/...`.

---

## 🤝 Contributing to the Frontend

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/ui‑enhancement`).
3. Make changes respecting the existing design system (use the CSS variables defined in `index.css`).
4. Run `npm test` (if test scripts are added) and ensure the UI remains responsive.
5. Push and open a Pull Request.

---

## 📜 License

The frontend is part of the overall project and is licensed under the **MIT License**.
