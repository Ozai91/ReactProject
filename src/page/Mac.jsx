import React, { useState, useEffect } from 'react'
import Macproduct from '../images/macpage/mac-family.png'
import ProductCard from '../components/ProductCard'

const Mac = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products/by-category?category=mac')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    fetchProducts()
  }, [])
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

      {/* Products Grid Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available Mac Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category="mac"
              />
            ))}
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
