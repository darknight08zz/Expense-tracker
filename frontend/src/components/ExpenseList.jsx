import '../styles/components.css';
import { getCategoryColor } from '../styles/index.js';
import {
  formatCurrency,
  formatExpenseDate,
  getCategoryEmoji,
  normalizeCategory,
} from '../utils/expense.js';

function ExpenseList({ expenses, onDelete, pendingDeleteId }) {
  return (
    <section className="glass-panel section-panel">
      <div className="section-heading section-heading-inline">
        <div>
          <span className="section-kicker">History</span>
          <h2 className="section-title">Transactions</h2>
        </div>
        <span className="summary-pill">{expenses.length} total</span>
      </div>

      {expenses.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon" aria-hidden="true">TX</div>
          <h3>No expenses found</h3>
          <p>Start by adding your first expense above.</p>
        </div>
      ) : (
        <div className="expense-list-grid">
          {expenses
            .slice()
            .reverse()
            .map((expense) => {
              const normalizedCategory = normalizeCategory(expense.category);
              const categoryStyle = getCategoryColor(normalizedCategory);
              const isDeleting = pendingDeleteId === expense.id;

              return (
                <article key={expense.id} className="expense-card">
                  <div className="expense-meta">
                    <div
                      className="category-icon"
                      style={{
                        backgroundColor: categoryStyle.backgroundColor,
                        color: categoryStyle.color,
                      }}
                    >
                      {getCategoryEmoji(normalizedCategory)}
                    </div>

                    <div className="expense-copy">
                      <h3>{expense.description}</h3>
                      <p>{formatExpenseDate(expense.created_at)}</p>
                    </div>
                  </div>

                  <div className="expense-actions">
                    <div className="expense-amount-block">
                      <strong>{formatCurrency(expense.amount)}</strong>
                      <span
                        className="category-badge"
                        style={{
                          backgroundColor: categoryStyle.backgroundColor,
                          color: categoryStyle.color,
                        }}
                      >
                        {normalizedCategory}
                      </span>
                    </div>

                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => onDelete(expense.id)}
                      disabled={isDeleting}
                      aria-label={`Delete ${expense.description}`}
                    >
                      {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
      )}
    </section>
  );
}

export default ExpenseList;
