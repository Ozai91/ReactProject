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
            iOne is Cambodia's largest Apple Authorized Reseller with premium high-traffic. 
            stores in AEON Mall Phnom Penh and AEON Mall Sen Sok. 
            We are proudly serving our customers in Cambodia since 2006. 
            Technical support is available at our Apple Service Provider in the iOne HQ Building.
          </p>
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mt-4">
            +20 Years of Expertise
          </p>
        </div>

        {/* Apple Products Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Apple Products</h3>
          <ul className="space-y-2">
            <li>Mac</li>
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
            <li>Device Protection Plan</li>
            <li>Workshops</li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <ul className="space-y-2">
            <li>SEYHAZIN: 023 999 3181</li>
            <li>BORAZIN: 023 999 3161</li>
            <li>Center: 023 999 7575</li>
            <li>information@ione2u.com</li>
            <div className="flex space-x-4 mt-4">
              <a href="#">Facebook</a>
              <a href="#">Instagram</a>
              <a href="#">TikTok</a>
            </div>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-400 text-sm mt-8">
        ©2006-2025 iOne Co., Ltd. All Rights Reserved | Privacy Policy
      </div>
    </footer>
      
    </div>
  )
}

export default Footer
