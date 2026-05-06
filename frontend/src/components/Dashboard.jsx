import { useMemo } from 'react';
import '../styles/components.css';
import { getCategoryColor } from '../styles/index.js';

function toTitleCase(value) {
  return value
    .toLowerCase()
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function normalizeCategory(category) {
  if (category === null || category === undefined) {
    return 'Other';
  }

  const trimmedCategory = String(category).trim();

  if (!trimmedCategory) {
    return 'Other';
  }

  return toTitleCase(trimmedCategory);
}

function Dashboard({ expenses }) {
  const totalAmount = useMemo(
    () => expenses.reduce((total, expense) => total + (Number(expense.amount) || 0), 0),
    [expenses]
  );

  const categoryWise = useMemo(() => {
    return expenses.reduce((groups, expense) => {
      const category = normalizeCategory(expense.category);
      const amount = Number(expense.amount) || 0;

      return {
        ...groups,
        [category]: (groups[category] || 0) + amount,
      };
    }, {});
  }, [expenses]);

  const highestCategory = useMemo(() => {
    const entries = Object.entries(categoryWise);

    if (entries.length === 0) {
      return null;
    }

    return entries.reduce((highest, current) =>
      current[1] > highest[1] ? current : highest
    )[0];
  }, [categoryWise]);

  const highestAmount = highestCategory ? categoryWise[highestCategory] : 0;
  const categoryEntries = Object.entries(categoryWise);

  return (
    <section className="mb-5">
      <div className="row g-4">
        <div className="col-md-4">
          <div className="dashboard-card">
            <h3>Total Balance</h3>
            <div className="fw-bold" style={{ color: 'var(--primary-color)', fontSize: '2.5rem' }}>
              ₹{totalAmount.toLocaleString()}
            </div>
            <p className="text-muted small mt-2">Cumulative spending</p>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card text-start">
            <h3>Top Category</h3>
            {highestCategory ? (
              <div className="d-flex align-items-center gap-3 mt-2">
                <div 
                  style={{ 
                    fontSize: '2.5rem',
                    backgroundColor: getCategoryColor(highestCategory).backgroundColor + '20',
                    padding: '10px',
                    borderRadius: '12px'
                  }}
                >
                  {getCategoryEmoji(highestCategory)}
                </div>
                <div>
                  <div className="fw-bold fs-4">{highestCategory}</div>
                  <div className="text-muted">₹{highestAmount.toLocaleString()}</div>
                </div>
              </div>
            ) : (
              <p className="text-muted mt-3">No data available</p>
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card">
            <h3 className="text-start">Budget Health</h3>
            <div className="mt-3">
              {categoryEntries.length === 0 ? (
                <p className="text-muted">Start adding expenses to see breakdown</p>
              ) : (
                categoryEntries.slice(0, 3).map(([category, amount]) => {
                  const categoryStyle = getCategoryColor(category);
                  const progressWidth = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;

                  return (
                    <div key={category} className="mb-3">
                      <div className="d-flex justify-content-between small mb-1">
                        <span className="fw-medium">{category}</span>
                        <span className="text-muted">{Math.round(progressWidth)}%</span>
                      </div>
                      <div className="progress" style={{ height: '6px', backgroundColor: '#e2e8f0' }}>
                        <div
                          className="progress-bar"
                          style={{ 
                            width: `${progressWidth}%`,
                            backgroundColor: categoryStyle.backgroundColor,
                            borderRadius: '10px'
                          }}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
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

export default Dashboard;
