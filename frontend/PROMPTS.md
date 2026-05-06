# Dev Log: Project Prompts & Iterations

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

Export these 3 functions:
1. getAllExpenses() — GET request to /expenses, returns array of expenses
2. addExpense(amount, description) — POST request to /expenses with
   { amount, description } as body, returns the created expense object
3. deleteExpense(id) — DELETE request to /expenses/:id

Each expense object looks like:
{ id, amount, description, category }

Handle errors properly in each function.
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

**Prompt 5:**
Create a file at src/services/mockApi.js

This file mimics the real api.js but uses hardcoded in-memory data
instead of real HTTP calls. Use this same export structure:

1. getAllExpenses() — returns a Promise that resolves with this array:
[
  { id: "1", amount: 250, description: "Zomato order", category: "Food" },
  { id: "2", amount: 150, description: "Uber to office", category: "Transport" },
  { id: "3", amount: 500, description: "Amazon headphones", category: "Shopping" }
]

2. addExpense(amount, description) — returns a Promise that resolves with:
{ id: Date.now().toString(), amount, description, category: "Food" }

3. deleteExpense(id) — returns a Promise that resolves with { success: true }

Add a comment at the top: "MOCK FILE — replace imports with api.js when backend is ready"
```

**Prompt 6.1 (Expanding the mock data):**
```text
Create a file at src/services/mockApi.js

This file mimics the real api.js but uses hardcoded in-memory data.
Use this exact export structure:

1. getAllExpenses() — returns a Promise that resolves with this array:
[
  { id: "1", amount: 250, description: "Zomato order", category: "Food" },
  { id: "2", amount: 150, description: "Uber to office", category: "Transport" },
  { id: "3", amount: 500, description: "Amazon headphones", category: "Shopping" },
  { id: "4", amount: 300, description: "Movie tickets", category: "Entertainment" },
  { id: "5", amount: 200, description: "Medicine", category: "Health" }
]

2. addExpense(amount, description) — returns a Promise that resolves with:
{ id: Date.now().toString(), amount: Number(amount), description, category: "Food" }

3. deleteExpense(id) — returns a Promise that resolves with { success: true }

Add a comment at the top:
// MOCK FILE — replace imports with api.js when backend is ready
```

---

**Phase 4: Refinement & Real Backend**

Once the backend was up, I realized I needed to switch from mock data to real API calls. I manually updated the `api.js` service to:
- Change the base URL to `http://localhost:8000`.
- Wrap all axios calls in `try/catch` blocks for robust error handling.
- Log errors to the console and re-throw them to allow the frontend to display appropriate error messages.



### Phase 5: Styling (Making it look "Premium")

Now for the fun part. I wanted Bootstrap and some custom CSS to make it look professional.

**Prompt 6 (Styled Form):**
```text
Let's make the ExpenseForm look better. Use Bootstrap cards.
Put the amount, description, and button in one row with 3 columns.
I also have a custom class "add-btn" I want to use.
And show "Adding..." when it's loading.
```


**Prompt 7 (Styled List):**
```text
Now for the ExpenseList. Each item should be in an "expense-card".
Show the description in bold and the amount in green (#4CAF50).
Add a category badge too. I'll pass a getCategoryColor function for the colors.
```

**Prompt 8 (Final Dashboard):**
```text
Final piece: the Dashboard.
I need 3 cards: Total Spent, Category Breakdown (with progress bars), and Highest Spending.
Use useMemo for the math part. Normalize category names to title case.
If no expenses, just show "No data yet".
```

### Final Polish: Connecting everything

One last push to get the main `App.jsx` connected to the mock data while I finalise the backend.

**Prompt 9 (Final Polish):**
```text
Okay, let's update App.jsx one last time.
Import the mock API functions.
I need state for expenses, isLoading, and error.
Make a fetchExpenses function and call it in useEffect.
Also, add a nice Navbar at the top with a money emoji 💰 and title "Expense Tracker".
Put everything in a Bootstrap container.
```


*Note: This file is a snapshot of the development process. Most of the heavy lifting was done with AI, but I had to tweak the CSS and ports manually to get it just right.*

