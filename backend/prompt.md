# Expense Tracker Backend: Prompts

This document contains the raw prompts used to generate the backend files for the Expense Tracker application.

---

## Prompt 1: In-Memory Store
**File:** `backend/store.py`

Create a Python file that acts as in-memory storage using a JSON-style data structure.

**Requirements:**
- Declare a variable `expenses` as an empty Python list.
- Each item in the list will be a dictionary (JSON-style object) with this structure:
  ```json
  {
    "id": "uuid-string",
    "amount": 0.0,
    "description": "string",
    "category": "string",
    "created_at": "ISO timestamp"
  }
  ```
- No database, no file I/O — data lives in memory only.
- No classes needed, just the list declaration.

*Add a comment at the top:*
`# In-memory storage — each expense is stored as a JSON-style dict`

---

## Prompt 2: AI Categorization Helper
**File:** `backend/categorize.py`

This file handles calling the Gemini AI API to auto-categorize expense descriptions.

**Tech:** Google GenerativeAI Python SDK, python-dotenv

**Requirements:**

1. Load `GEMINI_API_KEY` from `.env` using `load_dotenv()`
2. Define `VALID_CATEGORIES` list:
   ```
   ["Food", "Transport", "Shopping", "Entertainment", "Health", "Education", "Other"]
   ```
3. Export one function: `categorize_expense(description: str) -> str`
   - Configure Gemini using `genai.configure(api_key=os.getenv("GEMINI_API_KEY"))`
   - Load model using `genai.GenerativeModel("gemini-1.5-flash-latest")`
   - Call `model.generate_content()` with this exact prompt:
     ```
     Categorize this expense into one word only from:
     Food, Transport, Shopping, Entertainment, Health, Education, Other.
     Expense: {description}. Reply with one word only.
     ```
   - Strip and capitalize the response text using `.text.strip().capitalize()`
   - If the response is not in `VALID_CATEGORIES`, return `"Other"`
   - Wrap everything in `try/except` — if anything fails, return `"Other"`

---

## Prompt 3: Main FastAPI Application
**File:** `backend/main.py`

This is the core of the backend — FastAPI app with all 4 routes.

**Tech:** FastAPI, Pydantic, uuid, datetime, CORS middleware

**Imports needed:**
```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Dict
import uuid
from datetime import datetime, timezone
from store import expenses
from categorize import categorize_expense
```

**Setup:**
- Create FastAPI app with `title="AI Expense Tracker"` and `version="1.0.0"`
- Add `CORSMiddleware` with `allow_origins=["*"]`, `allow_methods=["*"]`, `allow_headers=["*"]`

**Request Model (Pydantic):**
```python
class ExpenseRequest(BaseModel):
    amount: float = Field(..., gt=0)             # must be > 0
    description: str = Field(..., min_length=1)  # cannot be empty
```

**4 Routes:**

1. **POST /expenses** — status_code `201`
   - Accept `ExpenseRequest` body
   - Call `categorize_expense(expense.description)` to get AI category
   - Build expense dict with id (uuid4), amount, description, category, created_at (ISO timestamp)
   - Append to `expenses` list from `store.py`
   - Return the new expense object

2. **GET /expenses**
   - Return the `expenses` list directly
   - FastAPI returns `[]` automatically if empty

3. **DELETE /expenses/{expense_id}**
   - Loop through `expenses` with `enumerate()`
   - If found: `expenses.pop(index)` and return `{"message": "Expense deleted successfully"}`
   - If not found: raise `HTTPException(status_code=404, detail="Expense not found")`

4. **GET /expenses/summary**
   - If list is empty, return `{ "totalAmount": 0, "categoryWise": {}, "highestSpendingCategory": None }`
   - Loop through all expenses, sum totalAmount, normalize category using `.strip().title()`
   - Build `categoryWise` dict, find highest using `max(category_wise, key=category_wise.get)`
   - Round all amounts to 2 decimal places before returning

---

## Prompt 4: Requirements File
**File:** `backend/requirements.txt`

List all Python packages needed to run this project:

```
fastapi
uvicorn
google-generativeai
python-dotenv
pydantic
```

*Note: No version pinning needed for this assignment.*

---

## Prompt 5: Environment Variables
**File:** `backend/.env.example`

Template file to show what environment variables are needed.
Do NOT include actual keys — this file is safe to push to GitHub.

```
GEMINI_API_KEY=your_api_key_here
```

*Instruction: Copy this to `.env` and replace with your real Gemini API key from aistudio.google.com*

---

## Prompt 6: README
**File:** `backend/README.md`

Generate a clean README with these sections:

1. **Project Title:** AI Expense Tracker — Backend
2. **One-line description:** REST API built with Python + FastAPI that auto-categorizes expenses using Gemini AI.

3. **Setup Steps:**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   # Add your GEMINI_API_KEY to .env
   uvicorn main:app --reload
   ```
   Server runs at `http://localhost:8000` — Auto docs at `http://localhost:8000/docs`

4. **API Endpoints** with sample request and response JSON for all 4 endpoints:
   - `POST /expenses`
   - `GET /expenses`
   - `DELETE /expenses/{id}`
   - `GET /expenses/summary`

5. **AI Prompt Used (inside categorize.py):**
   ```
   Categorize this expense into one word only from:
   Food, Transport, Shopping, Entertainment, Health, Education, Other.
   Expense: {description}. Reply with one word only.
   ```
   Model: `gemini-1.5-flash-latest` — Fallback: defaults to `"Other"` if AI call fails

6. **Backend Intern Responsibilities:**
   - Set up FastAPI project structure
   - Built all 4 REST API endpoints
   - Integrated Gemini AI for auto-categorization
   - Handled validation, error responses, and edge cases
   - Defined and shared API contract with frontend intern