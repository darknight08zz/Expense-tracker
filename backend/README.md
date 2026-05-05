# AI-Powered Expense Tracker Backend

Python + FastAPI REST API for an AI-powered expense tracker. Data is stored in memory, so expenses reset whenever the server restarts.

## Setup

```bash
cd backend
pip install -r requirements.txt
```

Create `.env` from `.env.example` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Start the server:

```bash
uvicorn main:app --reload --port 5000
```

The API runs on `http://localhost:5000`.

## Endpoints

### POST `/expenses`

Request:

```json
{
  "amount": 250,
  "description": "Zomato order"
}
```

Response:

```json
{
  "id": "abc123",
  "amount": 250,
  "description": "Zomato order",
  "category": "Food",
  "created_at": "2026-05-04T07:00:00.000000+00:00"
}
```

### GET `/expenses`

Response:

```json
[]
```

### DELETE `/expenses/{id}`

Response:

```json
{
  "message": "Expense deleted successfully"
}
```

### GET `/expenses/summary`

Response:

```json
{
  "total_amount": 250,
  "category_wise": {
    "Food": 250,
    "Transport": 0,
    "Shopping": 0,
    "Entertainment": 0,
    "Health": 0,
    "Education": 0,
    "Other": 0
  },
  "highest_spending_category": "Food"
}
```

## AI Prompt

```text
Categorize this expense into one word only from: Food, Transport, Shopping, Entertainment, Health, Education, Other. Expense: {description}. Reply with one word only.
```

If Claude fails or no API key is configured, the category falls back to `Other`.
