export default function AreaLoading() {
  return (
    <div className="section">
      <div className="container">
        <div className="text-center mb-12">
          <div className="h-10 bg-muted-200 rounded-lg w-80 mx-auto mb-4 animate-pulse"></div>
          <div className="h-5 bg-muted-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        
        <div className="bg-white rounded-xl border shadow-soft">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 bg-muted-200 rounded w-32 animate-pulse"></div>
              <div className="h-9 bg-muted-200 rounded-lg w-16 animate-pulse"></div>
            </div>
            <div className="h-11 bg-muted-200 rounded-lg animate-pulse"></div>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-5 bg-muted-200 rounded w-48 animate-pulse"></div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[...Array(3)].map((_, j) => (
                      <div key={j} className="h-4 bg-muted-200 rounded animate-pulse"></div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
