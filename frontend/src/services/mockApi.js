// MOCK FILE — replace imports with api.js when backend is ready

let expenses = [
  {
    id: '1',
    amount: 250,
    description: 'Zomato order',
    category: 'Food',
  },
  {
    id: '2',
    amount: 150,
    description: 'Uber to office',
    category: 'Transport',
  },
  {
    id: '3',
    amount: 500,
    description: 'Amazon headphones',
    category: 'Shopping',
  },
  {
    id: '4',
    amount: 300,
    description: 'Movie tickets',
    category: 'Entertainment',
  },
  {
    id: '5',
    amount: 200,
    description: 'Medicine',
    category: 'Health',
  },
];

export const getAllExpenses = () => Promise.resolve([...expenses]);

export const addExpense = (amount, description) => {
  const newExpense = {
    id: Date.now().toString(),
    amount: Number(amount),
    description,
    category: 'Food',
  };

  expenses = [...expenses, newExpense];

  return Promise.resolve(newExpense);
};

export const deleteExpense = (id) => {
  expenses = expenses.filter((expense) => expense.id !== id);
  return Promise.resolve({ success: true });
};
