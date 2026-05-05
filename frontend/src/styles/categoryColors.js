export const categoryColors = {
  Food: { background: '#fff3cd', text: '#856404' },
  Transport: { background: '#cfe2ff', text: '#084298' },
  Shopping: { background: '#f8d7da', text: '#842029' },
  Entertainment: { background: '#d1e7dd', text: '#0f5132' },
  Health: { background: '#e2d9f3', text: '#432874' },
  Utilities: { background: '#d3d3d3', text: '#333333' },
  Other: { background: '#f0f0f0', text: '#555555' },
};

export const getCategoryColor = (category) => {
  if (!category) return categoryColors.Other;

  const foundKey = Object.keys(categoryColors).find(
    (key) => key.toLowerCase() === category.toLowerCase()
  );

  return categoryColors[foundKey] || categoryColors.Other;
};

export default categoryColors;
