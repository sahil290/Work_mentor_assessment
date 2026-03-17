export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n ?? 0);

export const formatNumber = (n) =>
  new Intl.NumberFormat('en-IN').format(n ?? 0);

export const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });

export const stockStatus = (qty) => {
  if (qty === 0) return { label: 'Out of stock', color: 'text-red-600 bg-red-50 border border-red-200' };
  if (qty < 10)  return { label: 'Low stock',    color: 'text-amber-600 bg-amber-50 border border-amber-200' };
  return               { label: 'In stock',      color: 'text-green-600 bg-green-50 border border-green-200' };
};

export const categoryColor = (cat) => {
  const palette = [
    'text-violet-600 bg-violet-50 border border-violet-200',
    'text-cyan-600 bg-cyan-50 border border-cyan-200',
    'text-emerald-600 bg-emerald-50 border border-emerald-200',
    'text-pink-600 bg-pink-50 border border-pink-200',
    'text-amber-600 bg-amber-50 border border-amber-200',
    'text-sky-600 bg-sky-50 border border-sky-200',
    'text-rose-600 bg-rose-50 border border-rose-200',
    'text-teal-600 bg-teal-50 border border-teal-200',
  ];
  let hash = 0;
  for (let i = 0; i < cat.length; i++) hash = cat.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
};