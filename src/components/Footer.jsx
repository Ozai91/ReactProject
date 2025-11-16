import React from 'react'
import ifive from '../images/ifiveNO_BG.png';

const Footer = () => {
  return (
    <div>

      <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* iOne Section */}
        <div>
          <img src={ifive} alt="BIU" className="h-8 mb-4" />
          <p className="text-sm">
            iFive is a website that created by a group of four student for assignt project.
          </p>
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mt-4">
            +20 Years of Expertise
          </p>
        </div>

        {/* Apple Products Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Apple Products</h3>
          <ul className="space-y-2">
            <li>iPad</li>
            <li>iPhone</li>
            <li>Watch</li>
          </ul>
        </div>

        {/* Our Services Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2">
            <li>Service Center</li>
            <li>Trade-In</li>
            <li>Easy Payment</li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2">
            <li>vatana smos: 023 999 999</li>
            <li>Bora: 023 999 3161</li>
            <li>Otmeanemailte@iloveu.com</li>
            <div className="flex space-x-4 mt-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
            </div>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8">
        ©2006-2025 iFive Co., Ltd. All Rights Reserved | Privacy Policy
      </div>
    </footer>
      
    </div>
  )
}

export default Footer
