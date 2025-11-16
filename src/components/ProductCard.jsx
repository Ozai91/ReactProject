import React from 'react'
import { Eye, Heart, ShoppingCart, Truck, Tag } from 'lucide-react'
import { useCart } from '../context/CartContext'

const ProductCard = ({ id, name, price, image }) => {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({ id, name, price, image })
  }

  const handleView = () => {
    // Handle view functionality (can be expanded later)
    console.log('View product:', name)
  }

  const handleWishlist = () => {
    // Handle wishlist functionality (can be expanded later)
    console.log('Add to wishlist:', name)
  }

  // Handle image path - check if it's a full URL or relative path
  const getImageSrc = () => {
    if (!image) return 'https://via.placeholder.com/400?text=No+Image'
    if (image.startsWith('http')) return image
    if (image.startsWith('/')) return `http://localhost${image}`
    return `http://localhost/${image}`
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-xl flex flex-col">
      {/* Product Image Section */}
      <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-8">
        <img 
          src={getImageSrc()}
          alt={name}
          className="w-full h-full object-contain"
          onError={(e) => {
            console.error('Image failed to load:', image);
            e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found';
          }}
        />
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Action Icons Row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1"></div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleView}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="View product"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={handleWishlist}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Product Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 min-h-[3.5rem]">
          {name}
        </h3>

        {/* Features Badges */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Truck className="w-4 h-4" />
            <span>Fast Delivery</span>
          </div>
          <div className="flex items-center gap-1">
            <Tag className="w-4 h-4" />
            <span>Best Price</span>
          </div>
        </div>

        {/* Price and Add to Cart */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t">
          <p className="text-xl font-bold text-gray-900">${price}</p>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-2 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
