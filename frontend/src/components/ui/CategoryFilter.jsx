export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <button
        onClick={() => onChange('')}
        className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
          !selected
            ? 'bg-gray-900 text-white border-gray-900'
            : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const active = selected === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(active ? '' : cat)}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-all ${
              active
                ? 'bg-gray-900 text-white border-gray-900'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}