# Expense Tracker Frontend

This frontend provides the responsive user interface for the Expense Tracker app. It focuses on fast expense entry, AI-assisted category display, a dashboard for totals and category-wise insights, and a polished glass-morphism presentation across desktop and mobile.

## Tech Stack

- React with JSX
- React Scripts (Create React App)
- Axios for API requests
- Bootstrap utilities plus custom CSS

## Setup

```bash
cd frontend
npm install
npm start
```

The frontend runs on `http://localhost:3000` by default.

## Folder Structure

```text
frontend/
  src/
    components/   Reusable UI sections such as Dashboard, ExpenseForm, and ExpenseList
    services/     API client configuration and request helpers
    styles/       Shared visual tokens and component styling
    utils/        Expense sanitization and formatting helpers
```

## API Configuration

- The frontend calls the backend through `REACT_APP_API_URL`.
- If `REACT_APP_API_URL` is not set, it defaults to `http://localhost:8000`.
- Example:

```bash
REACT_APP_API_URL=http://localhost:8000
```

## Frontend Notes

- Missing, empty, or malformed category values are normalized to `Other` before rendering.
- Currency and timestamp display are sanitized on the client to avoid broken UI states.
- The add-expense flow includes a visible in-progress state while the AI categorization request is running.

## Remaining TODOs

- Add automated frontend tests for the loading, malformed-category, and delete states.
- If deployment needs a different backend origin, wire environment-specific `.env` files for each stage.
