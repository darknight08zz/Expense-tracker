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
    <section className="mb-4">
      <div className="row g-3">
        <div className="col-md-4">
          <div className="dashboard-card h-100">
            <h3>Total Spent</h3>
            <div style={{ color: '#4CAF50', fontSize: '32px', fontWeight: 'bold' }}>
              ₹{totalAmount}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card h-100">
            <h3>Category Breakdown</h3>

            {categoryEntries.length === 0 ? (
              <p>No data yet</p>
            ) : (
              categoryEntries.map(([category, amount]) => {
                const categoryStyle = getCategoryColor(category);
                const progressWidth = totalAmount > 0 ? (amount / totalAmount) * 100 : 0;

                return (
                  <div key={category} className="mb-3 text-start">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span
                        className="category-badge"
                        style={{
                          backgroundColor: categoryStyle.background,
                          color: categoryStyle.text,
                        }}
                      >
                        {category}
                      </span>
                      <span>₹{amount}</span>
                    </div>

                    <div className="progress" role="progressbar" aria-label={`${category} spending`}>
                      <div
                        className="progress-bar"
                        style={{ width: `${progressWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="col-md-4">
          <div className="dashboard-card h-100">
            <h3>Highest Spending</h3>

            {highestCategory ? (
              <>
                <span
                  className="category-badge"
                  style={{
                    backgroundColor: getCategoryColor(highestCategory).background,
                    color: getCategoryColor(highestCategory).text,
                  }}
                >
                  {highestCategory}
                </span>
                <div className="mt-3" style={{ fontSize: '28px', fontWeight: 'bold' }}>
                  ₹{highestAmount}
                </div>
              </>
            ) : (
              <p>No data yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
