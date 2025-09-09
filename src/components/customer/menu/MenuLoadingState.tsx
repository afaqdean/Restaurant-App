interface MenuLoadingStateProps {
  className?: string;
}

export function MenuLoadingState({ className = "" }: MenuLoadingStateProps) {
  return (
    <div className={`min-h-screen py-8 ${className}`} style={{ background: 'linear-gradient(to bottom, white, #aeeec8)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading menu...</p>
        </div>
      </div>
    </div>
  );
}
