import '../styles/components.css';
import { getCategoryColor } from '../styles/index.js';

function ExpenseList({ expenses, onDelete }) {
  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold m-0" style={{ color: 'var(--text-main)' }}>
          Transactions
        </h3>
        <span className="badge bg-light text-dark border px-3 py-2 rounded-pill">
          {expenses.length} Total
        </span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <div className="fs-1 mb-3">📭</div>
          <h5 className="fw-semibold">No expenses found</h5>
          <p className="mb-0">Start by adding your first expense above!</p>
        </div>
      ) : (
        <div className="row g-3">
          {expenses.slice().reverse().map((expense) => {
            const categoryStyle = getCategoryColor(expense.category);

            return (
              <div key={expense.id} className="col-12">
                <div className="expense-card d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center gap-3">
                    <div 
                      className="category-icon" 
                      style={{ 
                        backgroundColor: categoryStyle.backgroundColor + '20', 
                        color: categoryStyle.backgroundColor,
                        padding: '10px',
                        borderRadius: '12px',
                        fontSize: '1.2rem'
                      }}
                    >
                      {getCategoryEmoji(expense.category)}
                    </div>
                    <div>
                      <div className="fw-bold text-dark" style={{ fontSize: '1.1rem' }}>
                        {expense.description}
                      </div>
                      <div className="text-muted small">
                        {new Date(expense.created_at).toLocaleDateString(undefined, { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-4">
                    <div className="text-end">
                      <div className="fw-bold" style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>
                        ₹{Number(expense.amount).toLocaleString()}
                      </div>
                      <span
                        className="category-badge mt-1"
                        style={{
                          backgroundColor: categoryStyle.backgroundColor,
                          color: categoryStyle.color,
                        }}
                      >
                        {expense.category}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDelete(expense.id)}
                      title="Delete transaction"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function getCategoryEmoji(category) {
  const emojis = {
    'Food': '🍕',
    'Transport': '🚗',
    'Shopping': '🛍️',
    'Entertainment': '🎬',
    'Health': '🏥',
    'Education': '📚',
    'Other': '📦'
  };
  return emojis[category] || '💰';
}

export default ExpenseList;
