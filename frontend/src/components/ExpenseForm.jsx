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
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">Add New Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3 align-items-start">
            <div className="col-md-4">
              <input
                id="amount"
                type="number"
                className="form-control"
                placeholder="Enter amount (₹)"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="col-md-5">
              <input
                id="description"
                type="text"
                className="form-control"
                placeholder="Enter description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                disabled={isLoading}
              />
            </div>

            <div className="col-md-3">
              <button type="submit" className="add-btn" disabled={isLoading}>
                {isLoading ? 'Adding...' : 'Add Expense'}
              </button>
            </div>
          </div>

          {error ? <small className="text-danger d-block mt-2">{error}</small> : null}
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
