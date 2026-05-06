import { useMemo } from 'react';
import '../styles/components.css';
import { getCategoryColor } from '../styles/index.js';
import {
  formatCurrency,
  getCategoryEmoji,
  normalizeCategory,
} from '../utils/expense.js';

function Dashboard({ expenses }) {
  const totalAmount = useMemo(
    () => expenses.reduce((total, expense) => total + (Number(expense.amount) || 0), 0),
    [expenses]
  );

  const categoryEntries = useMemo(() => {
    const grouped = expenses.reduce((groups, expense) => {
      const category = normalizeCategory(expense.category);
      const amount = Number(expense.amount) || 0;

      return {
        ...groups,
        [category]: (groups[category] || 0) + amount,
      };
    }, {});

    return Object.entries(grouped).sort((left, right) => right[1] - left[1]);
  }, [expenses]);

  const topCategory = categoryEntries[0] || null;

  return (
    <section className="dashboard-grid">
      <article className="dashboard-card dashboard-card-accent">
        <span className="section-kicker">Total spending</span>
        <h2>{formatCurrency(totalAmount)}</h2>

      </article>

      <article className="dashboard-card">
        <span className="section-kicker">Top category</span>
        {topCategory ? (
          <div className="top-category-block">
            <div
              className="category-icon category-icon-lg"
              style={{
                backgroundColor: getCategoryColor(topCategory[0]).backgroundColor,
                color: getCategoryColor(topCategory[0]).color,
              }}
            >
              {getCategoryEmoji(topCategory[0])}
            </div>
            <div>
              <h2>{topCategory[0]}</h2>
              <p>{formatCurrency(topCategory[1])}</p>
            </div>
          </div>
        ) : (
          <p>No spending data yet.</p>
        )}
      </article>

      <article className="dashboard-card">
        <span className="section-kicker">Entries</span>
        <div className="top-category-block">
          <div
            className="category-icon category-icon-lg"
            style={{
              backgroundColor: 'var(--primary-color)',
              color: '#fff',
            }}
          >
            📊
          </div>
          <div>
            <h2>{expenses.length}</h2>
          </div>
        </div>
      </article>

      <article className="dashboard-card dashboard-card-wide">
        <div className="section-heading section-heading-inline">
          <div>
            <span className="section-kicker">Breakdown</span>
            <h2 className="section-title">Category-wise summary</h2>
          </div>
        </div>

        {categoryEntries.length === 0 ? (
          <p className="dashboard-empty">Start adding expenses to unlock your summary.</p>
        ) : (
          <div className="category-summary-list">
            {categoryEntries.map(([category, amount]) => {
              const categoryStyle = getCategoryColor(category);
              const share = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;

              return (
                <div key={category} className="category-summary-row">
                  <div className="category-summary-head">
                    <div className="category-summary-label">
                      <span
                        className="category-dot"
                        style={{ backgroundColor: categoryStyle.color }}
                        aria-hidden="true"
                      />
                      <span>{category}</span>
                    </div>
                    <div className="category-summary-values">
                      <strong>{formatCurrency(amount)}</strong>
                      <span>{share.toFixed(0)}%</span>
                    </div>
                  </div>
                  <div className="summary-track" aria-hidden="true">
                    <div
                      className="summary-fill"
                      style={{
                        width: `${share}%`,
                        background: `linear-gradient(90deg, ${categoryStyle.color}, ${categoryStyle.backgroundColor})`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </section>
  );
}

export default Dashboard;
