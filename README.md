# Expense Tracker

A modern **full‑stack Expense Tracker** built with a **FastAPI** backend and a **React** frontend. The app lets users add, view, and categorize expenses, with an AI‑powered categorization helper.

---

## ✨ Features

- **Add / edit / delete** expense entries.
- **Dashboard** summarizing total spendings and category breakdowns.
- **AI categorization** using Gemini (or any LLM) to auto‑assign categories.
- **Responsive UI** with a premium, glass‑morphism design.
- **Live reloading** for both backend (`uvicorn --reload`) and frontend (`npm start`).

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python 3.11, FastAPI, Uvicorn, Pydantic, google‑genai SDK |
| Frontend | React 18, Vite (or CRA), JavaScript/JSX, CSS (modern design) |
| Database | SQLite (or any DB you configure) |
| CI/CD | GitHub repository – push and pull workflow |

## 🚀 Getting Started

### Prerequisites

- **Node.js** (>=14) and npm
- **Python** (>=3.9) and pip
- Git

### Clone the repository

```bash
git clone https://github.com/darknight08zz/Expense-tracker.git
cd Expense-Tracker
```

### Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

### Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The React app runs on `http://localhost:3000` and proxies API requests to the backend.

### Building for Production

```bash
npm run build   # creates optimized static files in ./dist
```

You can serve the `dist` folder with any static server or integrate it with the FastAPI backend.

---

## 📚 Usage

1. Open the UI in your browser (`http://localhost:3000`).
2. Add a new expense via the **Add Expense** form.
3. The AI categorizer will suggest a category based on the description.
4. View expenses on the **Dashboard** and filter by category/date.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/awesome-feature`).
3. Commit your changes and push.
4. Open a PR against `main`.

## 📜 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details.

---

## 📞 Contact

- GitHub: [darknight08zz](https://github.com/darknight08zz)
- Email: youremail@example.com
