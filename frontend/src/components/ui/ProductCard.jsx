import { formatCurrency, formatDate, stockStatus, categoryColor } from '../../utils/format';

export default function ProductCard({ product, onEdit, onDelete }) {
  const stock = stockStatus(product.quantity);
  const catColor = categoryColor(product.category);

  return (
    <div className="card p-5 flex flex-col gap-3 hover:shadow-md hover:border-gray-200 transition-all duration-150 animate-slide-up group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-sm truncate">{product.name}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{formatDate(product.createdAt)}</p>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => onEdit(product)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(product)}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 hover:text-danger hover:bg-danger/8 transition-all"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className={`badge ${catColor}`}>{product.category}</span>
        <span className={`badge ${stock.color}`}>{stock.label}</span>
      </div>

      {product.description && (
        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{product.description}</p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-base font-semibold text-gray-900 font-mono tracking-tight">
          {formatCurrency(product.price)}
        </span>
        <span className="text-xs text-gray-400">
          Qty: <span className="text-gray-700 font-medium">{product.quantity}</span>
        </span>
      </div>
    </div>
  );
}