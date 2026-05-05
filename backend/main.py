from datetime import datetime, timezone
from typing import Dict, List, Optional
from uuid import uuid4
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from categorize import ALLOWED_CATEGORIES, categorize_expense, normalize_category
from store import expenses

app = FastAPI(title="AI-Powered Expense Tracker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExpenseCreate(BaseModel):
    amount: float
    description: str


class Expense(BaseModel):
    id: str
    amount: float
    description: str
    category: str
    created_at: str


class ExpenseSummary(BaseModel):
    total_amount: float
    category_wise: Dict[str, float]
    highest_spending_category: Optional[str]


@app.get("/")
def root():
    return {"message": "AI-Powered Expense Tracker API is running"}


@app.post("/expenses", response_model=Expense, status_code=201)
def create_expense(expense_data: ExpenseCreate):
    if expense_data.amount <= 0:
        raise HTTPException(status_code=400, detail="Amount must be greater than 0")

    description = expense_data.description.strip()
    if not description:
        raise HTTPException(status_code=400, detail="Description must not be empty")

    category = categorize_expense(description)
    expense = {
        "id": str(uuid4()),
        "amount": expense_data.amount,
        "description": description,
        "category": category,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }

    expenses.append(expense)
    return expense


@app.get("/expenses", response_model=List[Expense])
def get_expenses():
    return expenses


@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):
    for index, expense in enumerate(expenses):
        if expense["id"] == expense_id:
            expenses.pop(index)
            return {"message": "Expense deleted successfully"}

    raise HTTPException(status_code=404, detail="Expense not found")


@app.get("/expenses/summary", response_model=ExpenseSummary)
def get_expense_summary():
    category_wise = {category: 0.0 for category in ALLOWED_CATEGORIES.values()}
    total_amount = 0.0

    for expense in expenses:
        amount = float(expense.get("amount", 0))
        category = normalize_category(expense.get("category", "Other"))

        total_amount += amount
        category_wise[category] += amount

    highest_spending_category = None
    if total_amount > 0:
        highest_spending_category = max(category_wise, key=category_wise.get)

    return {
        "total_amount": total_amount,
        "category_wise": category_wise,
        "highest_spending_category": highest_spending_category,
    }
