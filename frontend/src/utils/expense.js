const CATEGORY_LABELS = {
  food: 'Food',
  transport: 'Transport',
  shopping: 'Shopping',
  entertainment: 'Entertainment',
  health: 'Health',
  education: 'Education',
  other: 'Other',
};

const CATEGORY_MARKS = {
  Food: '🍕',
  Transport: '🚗',
  Shopping: '🛍️',
  Entertainment: '🎬',
  Health: '🏥',
  Education: '📚',
  Other: '📦',
};

export function normalizeCategory(value) {
  if (value === null || value === undefined) {
    return 'Other';
  }

  const normalizedKey = String(value)
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ');

  if (!normalizedKey) {
    return 'Other';
  }

  const directMatch = CATEGORY_LABELS[normalizedKey];
  if (directMatch) {
    return directMatch;
  }

  const compactKey = normalizedKey.replace(/\s+/g, '');
  const foundLabel = Object.entries(CATEGORY_LABELS).find(([key]) => {
    return key.replace(/\s+/g, '') === compactKey;
  });

  return foundLabel ? foundLabel[1] : 'Other';
}

export function getCategoryEmoji(category) {
  return CATEGORY_MARKS[normalizeCategory(category)] || 'EX';
}

export function formatCurrency(amount) {
  const parsedAmount = Number(amount);
  const safeAmount = Number.isFinite(parsedAmount) ? parsedAmount : 0;

  return new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    maximumFractionDigits: safeAmount % 1 === 0 ? 0 : 2,
  }).format(safeAmount).replace(/^/, 'INR ');
}

export function formatExpenseDate(value) {
  const date = value ? new Date(value) : null;

  if (!date || Number.isNaN(date.getTime())) {
    return 'Recently added';
  }

  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function sanitizeExpense(expense, fallbackIndex = 0) {
  const amount = Number(expense?.amount);

  return {
    ...expense,
    id: expense?.id || `expense-${fallbackIndex}`,
    amount: Number.isFinite(amount) ? amount : 0,
    description: String(expense?.description || 'Untitled expense').trim() || 'Untitled expense',
    category: normalizeCategory(expense?.category),
    created_at: expense?.created_at || null,
  };
}
