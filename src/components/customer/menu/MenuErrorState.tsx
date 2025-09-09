interface MenuErrorStateProps {
  error: Error | null;
  onRetry: () => void;
  className?: string;
}

export function MenuErrorState({ error, onRetry, className = "" }: MenuErrorStateProps) {
  return (
    <div className={`min-h-screen py-8 ${className}`} style={{ background: 'linear-gradient(to bottom, white, #aeeec8)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-4">Error</h2>
          <p className="text-red-600 mb-6">
            {error instanceof Error ? error.message : "Failed to load menu"}
          </p>
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors duration-200"
          >
            Retry
          </button>
        </div>
      </div>
    </div>
  );
}
