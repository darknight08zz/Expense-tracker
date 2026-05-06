# Expense Tracker Frontend: Prompts & Iterations

This file tracks how I built the frontend, including the prompts I sent to AI and some notes on what I had to change manually.

---

### Phase 1: The Core logic

I started with the API. I just needed something basic to get the data moving.

**Prompt 1:**
```text
Hey, can you help me create a file at src/services/api.js?
I want it to use axios for communicating with the backend (localhost:8000 for now).
Export these:
1. getAllExpenses() -> GET /expenses
2. addExpense(amount, description) -> POST /expenses
3. deleteExpense(id) -> DELETE /expenses/:id
```

*Note: I decided to handle errors directly in each function using try/catch to keep the App controller clean.*

---

### Phase 2: Basic Components

Next, I needed some basic UI to see if it works. I didn't care about styling yet.

**Prompt 2 (Form):**
```text
Create a file at src/components/ExpenseForm.jsx

This is a React functional component with:
- A controlled number input for "amount"
- A controlled text input for "description"
- A submit button labeled "Add Expense"
- Uses useState for form state
- On submit, calls a prop function called "onAddExpense(amount, description)"
- Clears the form after submission
- Shows basic validation — don't submit if amount or description is empty
- Show a loading state on the button while submission is in progress
  (button shows "Adding..." and is disabled)

Props:
- onAddExpense: function(amount, description)
- isLoading: boolean
```

**Prompt 3 (List):**
```text
Create a file at src/components/ExpenseList.jsx

This is a React functional component that:
- Receives a prop "expenses" (array) and "onDelete" (function)
- Displays each expense in a card/row showing:
  Amount, Description, Category, and a Delete button
- Delete button calls onDelete(expense.id) when clicked
- If expenses array is empty, show a message "No expenses added yet"
- Each expense card should have a unique key prop using expense.id

Props:
- expenses: array of { id, amount, description, category }
- onDelete: function(id)
```

---

### Phase 3: Wiring it up

**Prompt 4 (Dashboard logic):**
```text
Create a file at src/components/Dashboard.jsx

This is a React functional component that:
- Receives a prop "expenses" (array of { id, amount, description, category })
- Calculates and displays:
  1. Total amount of all expenses
  2. Category-wise breakdown (e.g., Food: 250, Transport: 150)
  3. Highest spending category

- Handle edge cases:
  - Empty expenses array (show zeros)
  - Categories that might be undefined or null (group them as "Other")
  - Category names that differ in casing e.g. "food" and "Food"
    should be treated as same (normalize to title case)

Props:
- expenses: array
```

**Phase 3: Wiring it up (App.jsx)**

For the main controller, I decided to write the `App.jsx` logic manually to ensure I had full control over how the state updates and how the components interact. 

I implemented:
- `useState` to manage the central expenses list.
- `useEffect` to trigger the initial data fetch from the API.
- Custom handlers for adding and deleting expenses that update the state optimistically for a better user experience.


---

### Testing with Mock Data

My backend wasn't ready yet, so I asked for a mock version.

**Prompt 5 (Initial Mock Setup):**
```text
Create a file at src/services/mockApi.js.
This file should mimic the real api.js but use hardcoded in-memory data for now.
I need getAllExpenses, addExpense, and deleteExpense exported.
```

---

**Phase 4: Refinement & Real Backend**

Once the backend was up, I realized I needed to switch from mock data to real API calls. I manually updated the `api.js` service to:
- Change the base URL to `http://localhost:8000`.
- Wrap all axios calls in `try/catch` blocks for robust error handling.
- Log errors to the console and re-throw them to allow the frontend to display appropriate error messages.

---

**Phase 5: Styling & Polish**

For the UI, I used a mix of AI for the initial layouts and manual CSS for the fine-tuning.

**Prompt 6 (Styled Form):**
```text
Let's make the ExpenseForm look better. Use Bootstrap cards.
Put the amount, description, and button in one row with 3 columns.
I also have a custom class "add-btn" I want to use.
And show "Categorizing..." when it's loading.
```

**Manual Update: Expense List Styling**
I manually refined the `ExpenseList.jsx` to use the `expense-card` class and added the `category-badge` logic. I ensured the amount displays in the correct green shade (`#4CAF50`) and integrated the `getCategoryColor` utility to make the UI feel dynamic.


**Prompt 7 (Final Dashboard):**
```text
Final piece: the Dashboard.
I need 3 cards: Total Spent, Category Breakdown (with progress bars), and Highest Spending.
Use useMemo for the math part. Normalize category names to title case.
If no expenses, just show "No data yet".
```


**Prompt 8 (Final Polish):**
```text
Okay, let's update App.jsx one last time.
I need robust state management for expenses, isLoading, and error.
Make a fetchExpenses function and call it in useEffect.
Also, add a premium Navbar at the top with a money emoji 💰 and title "Expense Tracker".
Put all components in a Bootstrap container for a clean layout.
```
