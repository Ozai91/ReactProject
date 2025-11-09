import Slideshow from '@/components/Slider'
import { Sliders } from 'lucide-react'
import React from 'react'
import DealCard from '@/components/DealCard'
import LatestProducts from '@/components/LatestProducts'
import ipad from '../images/ImagesCard/ipadprom5.png'
import macbook from '../images/ImagesCard/macbook.png'
import iphone from '../images/ImagesCard/iphone17pm.png'

const deals = [
  {
    discount: 25,
    title: "MacBook Air M4 15-inch",
    image: macbook,
    link: "/gaming-deals"
  },
  {
    discount: 50,
    title: "Ipad",
    image: ipad,  // Fixed: Remove the curly braces
    link: "/laptop-deals"
  },
  {
    discount: 25,
    title: "Iphone 17 pro max",
    image: iphone,
    link: "/electronics-deals"
  }
];

const Home = () => {
  return (
    <div>
        <Slideshow/>
        
        {/* Featured Products Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {deals.map((deal, index) => (
              <DealCard
                key={index}
                discount={deal.discount}
                title={deal.title}
                image={deal.image}
                link={deal.link}
              />
            ))}
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
                <p className="text-gray-600">Only the best products from trusted brands</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                <p className="text-gray-600">Quick and reliable shipping worldwide</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Always here to help you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Products Section */}
        <LatestProducts />
    </div>
  )
}

export default Home
