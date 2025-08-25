export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-xl backdrop-saturate-150 bg-white/20 dark:bg-neutral-900/20 will-change-backdrop-filter will-change-opacity animate-glass-in">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-12 h-12 mx-auto mb-3 text-brand animate-pulse-soft">
            🌱
          </div>
          <div className="text-lg font-medium text-muted-800 dark:text-muted-200">
            Loading...
          </div>
        </div>
        <div className="sr-only">Loading page content</div>
      </div>
    </div>
  )
}
