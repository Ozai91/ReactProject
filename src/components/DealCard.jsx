import React from 'react'
import { ArrowRight } from 'lucide-react'

const DealCard = ({ discount, title, image, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full transition-all duration-300 ease-in-out hover:bg-gray-50 hover:shadow-lg transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="flex justify-center mb-6">
        <img 
          src={image} 
          alt={title}
          className="w-65 h-65 object-contain"
        />
      </div>

      {/* Discount Badge */}
      <div className="flex items-center gap-2 mb-4">
        <span className="inline-flex items-center rounded-full bg-grey-100 px-2.5 py-0.5 text-sm font-medium text-black-800">
          ✓ Up to {discount}% off today
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex-grow">
        {title}
      </h3>

      {/* See More Link */}
      <div className="mt-auto">
        <a
          href={link}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm font-medium"
        >
          See more {title.toLowerCase()} deals
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

export default DealCard