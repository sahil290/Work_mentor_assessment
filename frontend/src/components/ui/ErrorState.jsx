export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
      <div className="w-14 h-14 rounded-2xl bg-danger/5 border border-danger/15 flex items-center justify-center mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-danger">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <p className="text-gray-700 font-medium text-sm">Something went wrong</p>
      <p className="text-gray-400 text-sm mt-1 max-w-xs">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="mt-4 text-sm text-brand hover:underline font-medium">
          Try again
        </button>
      )}
    </div>
  );
}