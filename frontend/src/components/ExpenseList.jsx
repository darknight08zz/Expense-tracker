import '../styles/components.css';
import { getCategoryColor } from '../styles/index.js';

function ExpenseList({ expenses, onDelete }) {
  return (
    <section>
      <h2>All Expenses ({expenses.length})</h2>

      {expenses.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No expenses added yet. Add your first expense above!
        </div>
      ) : (
        expenses.map((expense) => {
          const categoryStyle = getCategoryColor(expense.category);

          return (
            <div
              key={expense.id}
              className="expense-card d-flex justify-content-between align-items-center"
            >
              <div>
                <div style={{ fontSize: '16px', fontWeight: 700 }}>
                  {expense.description}
                </div>
                <div style={{ color: '#4CAF50', fontWeight: 600 }}>
                  ₹{expense.amount}
                </div>
              </div>

              <div className="d-flex align-items-center gap-2">
                <span
                  className="category-badge"
                  style={{
                    backgroundColor: categoryStyle.backgroundColor,
                    color: categoryStyle.color,
                  }}
                >
                  {expense.category}
                </span>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      )}
    </section>
  );
}

export default ExpenseList;
