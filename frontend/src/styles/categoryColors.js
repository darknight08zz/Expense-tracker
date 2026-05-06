export const categoryColors = {
  Food: { backgroundColor: '#ffe2c0', color: '#7a3b00' },
  Transport: { backgroundColor: '#d7ecff', color: '#0f4573' },
  Shopping: { backgroundColor: '#ffd9e4', color: '#7d1739' },
  Entertainment: { backgroundColor: '#e2dcff', color: '#44308a' },
  Health: { backgroundColor: '#d6f5e8', color: '#0b5d45' },
  Education: { backgroundColor: '#fff0bf', color: '#7a5700' },
  Other: { backgroundColor: '#e7edf4', color: '#334155' },
};

export const getCategoryColor = (category) => {
  if (!category) {
    return categoryColors.Other;
  }

  const foundKey = Object.keys(categoryColors).find(
    (key) => key.toLowerCase() === String(category).trim().toLowerCase()
  );

  return categoryColors[foundKey] || categoryColors.Other;
};

export default categoryColors;
