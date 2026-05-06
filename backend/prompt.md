# Expense Tracker Backend: Prompts

This document contains the raw prompts used to generate the backend files for the Expense Tracker application.

---

## Prompt 1: In-Memory Store
**File:** `backend/store.py`

Create a simple Python file that acts as in-memory storage for the expense tracker.

**Requirements:**
- Declare a single variable `expenses` as an empty Python list.
- This list will hold all expense dictionaries at runtime.
- No classes, no imports needed.

*Add a comment at the top:*
`# In-memory storage — data lives here while server runs`

---

## Prompt 2: AI Categorization Helper
**File:** `backend/categorize.py`

This file handles calling the Claude AI API to auto-categorize expense descriptions.

**Tech:** Anthropic Python SDK, python-dotenv

**Requirements:**

1. Load `ANTHROPIC_API_KEY` from `.env` using `load_dotenv()`
2. Define `VALID_CATEGORIES` list:
   ```
   ["Food", "Transport", "Shopping", "Entertainment", "Health", "Education", "Other"]
   ```
3. Export one function: `categorize_expense(description: str) -> str`
   - Create an `Anthropic` client using the API key from env
   - Call `client.messages.create()` with:
     - model: `claude-haiku-20240307`
     - max_tokens: `10`
     - This exact prompt:
       ```
       Categorize this expense into one word only from:
       Food, Transport, Shopping, Entertainment, Health, Education, Other.
       Expense: {description}. Reply with one word only.
       ```
   - Strip and capitalize the response text
   - If the response is not in `VALID_CATEGORIES`, return `"Other"`
   - Wrap everything in `try/except` — if anything fails, return `"Other"`

*Note: max_tokens is 10 because we only need one word back.*

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
anthropic
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
ANTHROPIC_API_KEY=your_api_key_here
```

*Instruction: Copy this to `.env` and replace with your real Anthropic API key from console.anthropic.com*

---

## Prompt 6: README
**File:** `backend/README.md`

Generate a clean README with these sections:

1. **Project Title:** AI Expense Tracker — Backend
2. **One-line description:** REST API built with Python + FastAPI that auto-categorizes expenses using Claude AI.

3. **Setup Steps:**
   ```bash
   cd backend
   pip install -r requirements.txt
   cp .env.example .env
   # Add your ANTHROPIC_API_KEY to .env
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
   Model: `claude-haiku-20240307` — Fallback: defaults to `"Other"` if AI call fails

6. **Backend Intern Responsibilities:**
   - Set up FastAPI project structure
   - Built all 4 REST API endpoints
   - Integrated Claude AI for auto-categorization
   - Handled validation, error responses, and edge cases
   - Defined and shared API contract with frontend intern