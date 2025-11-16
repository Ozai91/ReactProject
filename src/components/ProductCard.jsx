import React from 'react'

const ProductCard = ({ name, price, image }) => {
  return (
    <div className="bg-white rounded-l shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">
      <div className="relative aspect-square">
        <img 
          src={`http://localhost${image}`}
          alt={name}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Image failed to load:', image);
            e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
          }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-550 mb-2">{name}</h3>
        <p className="text-red-500 font-bold text-sm mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>${price}</p>
        <button
          className="w-50% bg-blue-600 text-white font-bold py-2 px-4  hover:bg-blue-700 transition-colors duration-300"
          onClick={() => alert('Buy feature coming soon!')}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
