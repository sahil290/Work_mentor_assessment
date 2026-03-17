import Spinner from './Spinner';

export default function StatCard({ label, value, icon, sub, loading }) {
  return (
    <div className="stat-card animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{label}</span>
        <div className="w-7 h-7 rounded-lg bg-gray-50 border border-gray-150 flex items-center justify-center text-gray-500">
          {icon}
        </div>
      </div>
      {loading ? (
        <div className="text-gray-300"><Spinner size={16} /></div>
      ) : (
        <>
          <span className="text-2xl font-semibold text-gray-900 tracking-tight">{value}</span>
          {sub && <span className="text-xs text-gray-400 mt-0.5">{sub}</span>}
        </>
      )}
    </div>
  );
}