export default function QuoteLoading() {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <div className="h-8 bg-muted-200 rounded-lg w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-muted-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Form skeleton */}
            <div className="bg-white rounded-xl border p-6 shadow-soft">
              <div className="space-y-4">
                <div className="h-4 bg-muted-200 rounded w-32 animate-pulse"></div>
                <div className="h-11 bg-muted-200 rounded-lg animate-pulse"></div>
                
                <div className="h-4 bg-muted-200 rounded w-24 animate-pulse"></div>
                <div className="h-11 bg-muted-200 rounded-lg animate-pulse"></div>
                
                <div className="h-4 bg-muted-200 rounded w-20 animate-pulse"></div>
                <div className="h-24 bg-muted-200 rounded-lg animate-pulse"></div>
                
                <div className="h-11 bg-brand rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
