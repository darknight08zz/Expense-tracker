import { useState } from 'react';
import '../styles/components.css';

function ExpenseForm({ onAddExpense, isLoading }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();
    const parsedAmount = Number(amount);

    if (!trimmedDescription || amount === '') {
      setError('Amount and description are required.');
      return;
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      setError('Enter an amount greater than 0.');
      return;
    }

    setError('');

    try {
      await onAddExpense(parsedAmount, trimmedDescription);
      setAmount('');
      setDescription('');
    } catch (submitError) {
      setError(submitError.message || 'Failed to add expense.');
    }
  };

  return (
    <section className="glass-panel section-panel">
      <div className="section-heading">
        <div>
          <span className="section-kicker">New expense</span>
          <h2 className="section-title">Add an expense</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="expense-form">
        <div className="row g-3 align-items-end">
          <div className="col-lg-3 col-md-4">
            <label htmlFor="amount" className="form-label">Amount (INR)</label>
            <input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              className="form-control form-control-lg form-input"
              placeholder="0.00"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="col-lg-6 col-md-5">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              id="description"
              type="text"
              className="form-control form-control-lg form-input"
              placeholder="Dinner with clients, pharmacy bill, metro recharge..."
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="col-lg-3 col-md-3">
            <button type="submit" className="add-btn w-100" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner-ring spinner-ring-sm" aria-hidden="true" />
                  Categorizing...
                </>
              ) : (
                'Add Expense'
              )}
            </button>
          </div>
        </div>

        
      </form>
    </section>
  );
}

export default ExpenseForm;
