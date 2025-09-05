export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-muted-50 to-white">
      <div className="flex flex-col items-center space-y-4 animate-fade-in-up">
        {/* Animated logo */}
        <div className="relative w-16 h-16 animate-spin">
          <div className="w-16 h-16 rounded-full border-4 border-brand/20 border-t-brand flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center">
              <span className="text-brand font-bold text-lg">M</span>
            </div>
          </div>
        </div>
        
        {/* Loading text */}
        <div className="text-center animate-fade-in-up delay-300">
          <h2 className="text-xl font-semibold text-muted-800 mb-2">Loading...</h2>
          <p className="text-muted-600">Preparing your lawn care experience</p>
        </div>
        
        {/* Animated dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-brand rounded-full animate-pulse"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1.5s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
