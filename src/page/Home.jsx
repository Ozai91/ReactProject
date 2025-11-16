import Slideshow from '@/components/Slider'
import { Sliders } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import DealCard from '@/components/DealCard'
import LatestProducts from '@/components/LatestProducts'
import ipad from '../images/ImagesCard/ipadprom5.png'
import macbook from '../images/ImagesCard/macbook.png'
import iphone from '../images/ImagesCard/iphone17pm.png'
import welcomeVideo from '../video/iphone17pmWelcome.mp4'
import welcomeImage from '../images/iphone17pmwelocomeIMG2.jpg'
import iphoneAirVideo from '../video/iphone17air.mp4'

const deals = [
  {
    discount: 25,
    title: "MacBook Air M4 15-inch",
    image: macbook,
    link: "/mac"
  },
  {
    discount: 50,
    title: "Ipad",
    image: ipad,
    link: "/ipad"
  },
  {
    discount: 25,
    title: "Iphone 17 pro max",
    image: iphone,
    link: "/iphone"
  }
];

const Home = () => {
  const [hasPlayed, setHasPlayed] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const videoRef = useRef(null)
  const sectionRef = useRef(null)
  
  const [hasPlayedAir, setHasPlayedAir] = useState(false)
  const airVideoRef = useRef(null)
  const airSectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the section comes into view and video hasn't played yet
          if (entry.isIntersecting && !hasPlayed && videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.error('Error playing video:', error)
            })
            setHasPlayed(true)
          }
        })
      },
      {
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [hasPlayed])

  const handleVideoEnd = () => {
    setShowImage(true)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When the iPhone Air section comes into view and video hasn't played yet
          if (entry.isIntersecting && !hasPlayedAir && airVideoRef.current) {
            airVideoRef.current.play().catch((error) => {
              console.error('Error playing iPhone Air video:', error)
            })
            setHasPlayedAir(true)
          }
        })
      },
      {
        threshold: 0.3 // Trigger when 30% of the section is visible
      }
    )

    if (airSectionRef.current) {
      observer.observe(airSectionRef.current)
    }

    return () => {
      if (airSectionRef.current) {
        observer.unobserve(airSectionRef.current)
      }
    }
  }, [hasPlayedAir])

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

        {/* iPhone Welcome Video Section */}
        <div ref={sectionRef} className="relative w-full bg-black min-h-[600px] flex items-center justify-center overflow-hidden">
          {!showImage ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnd}
              muted
              playsInline
            >
              <source src={welcomeVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <img
                src={welcomeImage}
                alt="iPhone 17 Pro Max"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
                <Link
                  to="/iphone"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 shadow-lg"
                >
                  Buy
                </Link>
              </div>
            </div>
          )}
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

        {/* iPhone Air Video Section */}
        <div ref={airSectionRef} className="w-full bg-white py-16">
          <div className="container mx-auto px-4">
            {/* Text Content Above Video */}
            <div className="flex flex-col items-center justify-center mb-12">
              {/* Product Name */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-400 mb-4 text-center">
                iPhone Air
              </h2>
              
              {/* Taglines */}
              <p className="text-xl md:text-2xl text-gray-600 mb-2 text-center">
                The thinnest iPhone ever.
              </p>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 text-center">
                With the power of pro inside.
              </p>
              
              {/* Buy Button and Pricing */}
              <div className="flex flex-col items-center gap-4 mt-4">
                <Link
                  to="/iphone"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg text-lg transition-colors duration-300 shadow-lg"
                >
                  Buy
                </Link>
                <p className="text-gray-700 text-base md:text-lg">
                  From $999 or $41.62/mo. for 24 mo.*
                </p>
              </div>
            </div>
            
   
          </div>
                   {/* Video Below Text */}
                   <div className="relative w-full bg-white min-h-[200px] flex items-center justify-center overflow-hidden rounded-lg">
              <video
                ref={airVideoRef}
                className="w-full h-full object-cover"
                muted
                playsInline
                loop={false}
              >
                <source src={iphoneAirVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
        </div>

        {/* Latest Products Section */}
        <LatestProducts />
    </div>
  )
}

export default Home
