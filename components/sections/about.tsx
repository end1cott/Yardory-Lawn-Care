export default function About() {
  return (
    <section id="about" className="section bg-muted-50/40 scroll-mt-24 md:scroll-mt-28 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand" tabIndex={-1} data-section-anchor>
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl font-semibold mb-4">About Us</h2>
          <p className="text-lg text-muted-600 max-w-3xl mx-auto">
            We are a team of professionals who transform ordinary yards into well-maintained oases
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center animate-fade-in-up delay-100">
          {/* Left column - Image */}
          <div className="relative flex justify-center">
            <div className="w-64 h-64 bg-green-500 rounded-full flex items-center justify-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Right column - Content */}
          <div className="space-y-6 animate-fade-in-up delay-200">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold">Why Choose Us?</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                                         <h4 className="font-medium mb-1">Experience & Professionalism</h4>
                     <p className="text-muted-600 text-sm">Over 2 years of experience in lawn care in Philadelphia</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Reliability & Punctuality</h4>
                    <p className="text-muted-600 text-sm">Always arrive on time and perform work with quality</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Modern Equipment</h4>
                    <p className="text-muted-600 text-sm">Use professional equipment for perfect results</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Personal Approach</h4>
                    <p className="text-muted-600 text-sm">Consider the features of each yard and client wishes</p>
                  </div>
                </div>
              </div>
            </div>

                         <div className="pt-4">
               <div className="grid grid-cols-3 gap-6 text-center">
                 <div>
                   <div className="text-2xl font-bold text-green-600 mb-1">450+</div>
                   <div className="text-sm text-muted-600">Happy Clients</div>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-green-600 mb-1">2+</div>
                   <div className="text-sm text-muted-600">Years Experience</div>
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-green-600 mb-1">100%</div>
                   <div className="text-sm text-muted-600">Quality Guarantee</div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
