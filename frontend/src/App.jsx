import { useEffect, useState } from 'react';
import './App.css';
import './styles/components.css';
import Dashboard from './components/Dashboard.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';

import {
  addExpense,
  deleteExpense,
  getAllExpenses,
} from './services/api.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await getAllExpenses();
      setExpenses(result);
    } catch (loadError) {
      setError('Failed to load expenses');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExpense = async (amount, description) => {
    setIsLoading(true);
    setError(null);

    try {
      const newExpense = await addExpense(amount, description);
      setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
    } catch (addError) {
      setError('Failed to add expense');
      throw addError;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    setError(null);

    try {
      await deleteExpense(id);
      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== id)
      );
    } catch (deleteError) {
      setError('Failed to delete expense');
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const showInitialSpinner = isLoading && expenses.length === 0;

  return (
    <div>
      <nav
        className="navbar"
        style={{ backgroundColor: '#4CAF50' }}
      >
        <div className="container">
          <span className="navbar-brand mb-0 h1 text-white">
            💰 Expense Tracker
          </span>
        </div>
      </nav>

      <div className="container py-4">
        {error ? (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
          >
            {error}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => setError(null)}
            />
          </div>
        ) : null}

        {showInitialSpinner ? (
          <div className="d-flex justify-content-center py-5">
            <div className="spinner-border text-success" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className="row mb-4">
              <div className="col-12">
                <Dashboard expenses={expenses} />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-12">
                <ExpenseForm
                  onAddExpense={handleAddExpense}
                  isLoading={isLoading}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <ExpenseList
                  expenses={expenses}
                  onDelete={handleDeleteExpense}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
