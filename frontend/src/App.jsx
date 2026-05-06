import { useEffect, useMemo, useState } from 'react';
import './App.css';
import './styles/components.css';
import Dashboard from './components/Dashboard.jsx';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';
import { addExpense, deleteExpense, getAllExpenses } from './services/api.js';
import { sanitizeExpense } from './utils/expense.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  const safeExpenses = useMemo(
    () => expenses.map((expense, index) => sanitizeExpense(expense, index)),
    [expenses]
  );

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const fetchExpenses = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const result = await getAllExpenses();
      setExpenses(result);
    } catch (loadError) {
      setError('Failed to load expenses. Check that the backend is running.');
    } finally {
      setIsFetching(false);
    }
  };

  const handleAddExpense = async (amount, description) => {
    setIsSubmitting(true);
    setError(null);
    setToast({
      tone: 'progress',
      message: 'AI categorization in progress...',
    });

    try {
      const newExpense = await addExpense(amount, description);
      setExpenses((currentExpenses) => [...currentExpenses, newExpense]);
      setToast({
        tone: 'success',
        message: 'Expense saved and categorized.',
      });
    } catch (addError) {
      setError('Failed to add expense.');
      setToast({
        tone: 'error',
        message: 'Could not categorize and save that expense.',
      });
      throw addError;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteExpense = async (id) => {
    setError(null);
    setPendingDeleteId(id);

    try {
      await deleteExpense(id);
      setExpenses((currentExpenses) =>
        currentExpenses.filter((expense) => expense.id !== id)
      );
      setToast({
        tone: 'success',
        message: 'Expense deleted.',
      });
    } catch (deleteError) {
      setError('Failed to delete expense.');
      setToast({
        tone: 'error',
        message: 'Delete request failed.',
      });
    } finally {
      setPendingDeleteId(null);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const showInitialSpinner = isFetching && safeExpenses.length === 0;

  return (
    <div className="app-shell">
      <div className="app-background" aria-hidden="true" />

      <nav className="app-nav sticky-top">
        <div className="container">
          <div className="nav-brand">
            <span className="nav-brand-mark" aria-hidden="true">
              💰
            </span>
            <div className="nav-heading">
              <span className="navbar-brand mb-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '1.8rem', color: 'var(--primary-color)' }}>Expense Tracker</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="container app-main">


        {toast ? (
          <div className={`status-toast status-toast-${toast.tone}`} role="status" aria-live="polite">
            {toast.tone === 'progress' ? <span className="toast-spinner" aria-hidden="true" /> : null}
            <span>{toast.message}</span>
          </div>
        ) : null}

        {error ? (
          <div className="glass-alert" role="alert">
            <div>{error}</div>
            <button type="button" className="alert-dismiss" onClick={() => setError(null)} aria-label="Dismiss error">
              X
            </button>
          </div>
        ) : null}

        {showInitialSpinner ? (
          <div className="page-loader" role="status" aria-live="polite">
            <div className="spinner-ring" aria-hidden="true" />
            <p>Loading your expense history...</p>
          </div>
        ) : (
          <div className="content-stack">
            <Dashboard expenses={safeExpenses} />
            <ExpenseForm onAddExpense={handleAddExpense} isLoading={isSubmitting} />
            <ExpenseList
              expenses={safeExpenses}
              onDelete={handleDeleteExpense}
              pendingDeleteId={pendingDeleteId}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
