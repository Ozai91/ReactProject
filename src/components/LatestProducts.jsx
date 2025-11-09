import React from 'react'
import ipad from '../images/ImagesCard/ipadprom5.png'

const LatestProducts = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Latest Products</h2>
        <a href="/products" className="text-blue-600 hover:text-blue-800 flex items-center gap-2">
          View all 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="aspect-w-1 aspect-h-1">
              <img 
                src={ipad} 
                alt="Product" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-2">New Product {item}</h3>
              <p className="text-blue-600">$999</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LatestProducts