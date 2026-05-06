# Expense Tracker Frontend: Prompts

This document contains the raw prompts used to generate the frontend components and services for the Expense Tracker application.

---

## Prompt 1: Mock API File
**File:** `src/services/mockApi.js`

This file mimics the real `api.js` but uses hardcoded in-memory data. Use this exact export structure:

1. **getAllExpenses()** — returns a Promise that resolves with this array:
```javascript
[
  { id: "1", amount: 250, description: "Zomato order", category: "Food" },
  { id: "2", amount: 150, description: "Uber to office", category: "Transport" },
  { id: "3", amount: 500, description: "Amazon headphones", category: "Shopping" },
  { id: "4", amount: 300, description: "Movie tickets", category: "Entertainment" },
  { id: "5", amount: 200, description: "Medicine", category: "Health" }
]
```

2. **addExpense(amount, description)** — returns a Promise that resolves with:
```javascript
{ id: Date.now().toString(), amount: Number(amount), description, category: "Food" }
```

3. **deleteExpense(id)** — returns a Promise that resolves with `{ success: true }`

*Add a comment at the top:*
`// MOCK FILE — replace imports with api.js when backend is ready`

---

## Prompt 2: Real API Service File
**File:** `src/services/api.js`

This project uses Create React App and backend runs on `http://localhost:5000`. Use axios to create these 3 exported functions:

1. **getAllExpenses()**
   - GET request to `http://localhost:5000/expenses`
   - Returns `response.data`

2. **addExpense(amount, description)**
   - POST request to `http://localhost:5000/expenses`
   - Request body: `{ amount: Number(amount), description }`
   - Returns `response.data`

3. **deleteExpense(id)**
   - DELETE request to `http://localhost:5000/expenses/${id}`
   - Returns `response.data`

*Note: Wrap each function in try/catch. On error, console.error the error message and re-throw it so the calling component can handle it.*

---

## Prompt 3: ExpenseForm Component
**File:** `src/components/ExpenseForm.jsx`

This project uses React with `useState` hook, Bootstrap classes for layout, and custom CSS classes from `src/styles/components.css`.

**UI Structure:**
- A Bootstrap Card as wrapper with title "Add New Expense"
- Inside the card, a Bootstrap Row with 3 columns:
  - **Col 1:** number input for amount (placeholder "Enter amount (₹)", Bootstrap class "form-control")
  - **Col 2:** text input for description (placeholder "Enter description", Bootstrap class "form-control")
  - **Col 3:** submit button (custom class "add-btn", shows "Add Expense" normally, "Adding..." when `isLoading` is true)

**Behavior:**
- Both inputs are controlled using `useState`.
- On submit:
  - Validate both fields are not empty (show error below inputs instead of alert).
  - Call prop function `onAddExpense(amount, description)`.
  - Clear both inputs after successful call.

**Props received:**
- `onAddExpense`: function(amount, description)
- `isLoading`: boolean

---

## Prompt 4: ExpenseList Component
**File:** `src/components/ExpenseList.jsx`

This project uses React, Bootstrap classes, and custom classes (`expense-card`, `category-badge`, `delete-btn`). It also uses `getCategoryColor` from `src/styles/index.js`.

**UI Structure:**
- Heading "All Expenses" with total count: "All Expenses (3)"
- If empty: show centered Bootstrap Alert (variant info) "No expenses added yet."
- If not empty: map expenses to `expense-card` divs:
  - **Left side:** Description (bold, 16px) and Amount ("₹{amount}", green #4CAF50, 600 weight).
  - **Right side:** Category badge (inline style from `getCategoryColor`) and Delete button.

**Props received:**
- `expenses`: array of `{ id, amount, description, category }`
- `onDelete`: function(id)

---

## Prompt 5: Dashboard Component
**File:** `src/components/Dashboard.jsx`

Uses React with `useMemo`, Bootstrap Grid, and custom classes.

**Calculations (use useMemo):**
1. `totalAmount`: sum of all expense amounts.
2. `categoryWise`: object with category keys and total values (normalized to title case, nulls as "Other").
3. `highestCategory`: category name with the highest total.

**UI Structure (3 Cards in a Row):**
1. **Total Spent:** Shows "₹{totalAmount}" in green (#4CAF50), 32px, bold.
2. **Category Breakdown:** Lists each category with a badge, amount, and a Bootstrap progress bar.
3. **Top Category:** Shows highest spending category badge and amount.

**Props received:**
- `expenses`: array

---

## Prompt 6: App.jsx Main Controller
**File:** `src/App.jsx`

Main controller using `useState` and `useEffect`. Currently using MOCK data.

**State:** `expenses` (array), `isLoading` (boolean), `error` (string/null).

**Functions:**
1. `fetchExpenses()`: calls `getAllExpenses()`, updates state.
2. `handleAddExpense(amount, description)`: calls `addExpense()`, appends returned object to state.
3. `handleDeleteExpense(id)`: calls `deleteExpense()`, filters out ID from state.

**UI Structure:**
- Navbar at top (background #4CAF50, white text, title "💰 Expense Tracker").
- Container with Row 1 (Dashboard), Row 2 (ExpenseForm), Row 3 (ExpenseList).
- Show Spinner while loading, Alert variant "danger" for errors.

---

## Prompt 7: Style Utilities, Sanitization, and Basic CSS
**Files:** `src/styles/categoryColors.js`, `src/styles/components.css`, `src/utils/expense.js`

1. **src/styles/categoryColors.js**
   - Define `categoryColors` object with light background and dark matching text for common categories.
   - Export `getCategoryColor(category)` helper function (case-insensitive, default to "Other").

2. **src/styles/components.css**
   - **.expense-card:** Flexbox layout, white background, subtle shadow, hover lift.
   - **.category-badge:** Small, bold, and rounded.
   - **.delete-btn:** Minimalist red button, highlights on hover.
   - **.add-btn:** Premium green gradient button with shadow.
   - **.dashboard-card:** Clean card-based layout for summary stats.

3. **src/utils/expense.js**
   - Define `CATEGORY_LABELS` for mapping.
   - Export `normalizeCategory(value)` and `sanitizeExpense(expense, index)` for data integrity.


