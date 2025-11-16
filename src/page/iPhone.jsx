import React, { useState, useEffect } from 'react'
import ProductCard from '../components/ProductCard'

const IPhonePage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost/Clones/ReactProject/src/phpform/getProducts.php?category=iphone')
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        
        // Check if response has error property
        if (data.error) {
          console.error('API Error:', data.error)
          setProducts([])
          return
        }
        
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data)
        } else {
          console.error('Invalid data format:', data)
          setProducts([])
        }
      } catch (error) {
        console.error('Error fetching products:', error)
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-8">
            {/* Badge */}
            <div className="bg-gray-100 rounded-full px-4 py-1 mb-4">
              <span className="text-sm text-gray-700">
                <span className="text-gray-800">Apple</span> <span className="text-pink-500">iPhone</span>
              </span>
            </div>
            
            {/* Subtitle */}
            <p className="text-gray-600 text-lg mb-6">Designed to be loved.</p>
            
            {/* Main Heading */}
            <h1 className="text-center text-5xl md:text-6xl lg:text-7xl font-semibold mb-8">
              Find the right <span className="text-purple-600">iPhone</span> for you.
            </h1>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Available iPhone Products</h2>
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No iPhone products available at the moment.</p>
              <p className="text-gray-500 text-sm mt-2">Please add products through the Add Product page.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Text Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <p className="text-gray-600 text-lg">
              Discover the whole Apple iPhone lineup at iFive and experience them firsthand in our premium stores.
            </p>
            <p className="text-gray-600 text-lg">
              We have been an Apple Authorized Reseller for two decades in Cambodia.
            </p>
            <p className="text-gray-600 text-xl font-medium mt-6">
              iFive - The One You Trust!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default IPhonePage