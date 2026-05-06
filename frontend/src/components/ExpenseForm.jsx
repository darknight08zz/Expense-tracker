import { useState } from 'react';
import '../styles/components.css';

function ExpenseForm({ onAddExpense, isLoading }) {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedDescription = description.trim();

    if (amount === '' || trimmedDescription === '') {
      setError('Amount and description are required.');
      return;
    }

    setError('');

    try {
      await onAddExpense(amount, trimmedDescription);
      setAmount('');
      setDescription('');
    } catch (submitError) {
      setError(submitError.message || 'Failed to add expense.');
    }
  };

  return (
    <div className="card shadow-sm border-0 mb-4">
      <div className="card-body p-4">
        <h4 className="card-title mb-4 fw-bold" style={{ color: 'var(--text-main)' }}>
          ✨ Add New Expense
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-end">
            <div className="col-md-4">
              <label htmlFor="amount" className="form-label small fw-semibold text-muted">Amount (₹)</label>
              <input
                id="amount"
                type="number"
                className="form-control form-control-lg border-light-subtle"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                disabled={isLoading}
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="description" className="form-label small fw-semibold text-muted">Description</label>
              <input
                id="description"
                type="text"
                className="form-control form-control-lg border-light-subtle"
                placeholder="What did you spend on?"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isLoading}
                style={{ borderRadius: '10px' }}
              />
            </div>

            <div className="col-md-3">
              <button type="submit" className="add-btn w-100 py-3" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Categorizing...
                  </>
                ) : (
                  'Add Expense'
                )}
              </button>
            </div>
          </div>

          {error ? (
            <div className="mt-3 text-danger small d-flex align-items-center">
              {error}
            </div>
          ) : null}
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
