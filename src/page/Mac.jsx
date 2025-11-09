import React from 'react'
import Macproduct from '../images/macpage/mac-family.png'
const Mac = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-semibold mb-8">
            Find the right <span className="text-purple-600">MacBook Air</span> for you.
          </h1>
          
          {/* MacBook Image Display */}
          <div className="mt-16 mb-12">
            <div className="max-w-7xl mx-auto">
              <img 
                src={Macproduct} 
                alt="MacBook Air Lineup" 
                className="w-full h-auto transition-transform duration-700 hover:scale-[1.02]" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Text Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-gray-600 text-lg">
              Discover the whole Apple Mac lineup at iOne and experience them firsthand in our premium stores.
            </p>
            <p className="text-gray-600 text-lg">
              We have been an Apple Authorized Reseller for two decades in Cambodia.
            </p>
            <p className="text-gray-600 text-xl font-medium mt-6">
              iOne - The One You Trust!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Mac
