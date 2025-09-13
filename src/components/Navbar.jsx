import React from 'react'
import { Search } from "lucide-react";
import { useState } from "react";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const navItems = [
    { label: "Mac", submenu: ["MacBook Air", "MacBook Pro", "iMac", "Mac Mini"] },
    { label: "iPad", submenu: ["iPad Pro", "iPad Air", "iPad Mini"] },
    { label: "iPhone", submenu: ["iPhone 16 Pro", "iPhone 16", "iPhone SE"] },
    { label: "Watch", submenu: ["Apple Watch Ultra", "Apple Watch Series 10", "Apple Watch SE"] },
    { label: "Accessories", submenu: ["AirPods", "Chargers", "Covers"] },
    { label: "Services", submenu: ["AppleCare", "iCloud", "Apple Music"] },
    { label: "Offers", submenu: ["Student Offer", "Trade-in", "Discounts"] },
    { label: "Stores", submenu: ["Phnom Penh", "Siem Reap", "Online Store"] },
  ];
  return (
    <div>


    <nav className="w-full border-b bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Logo + Apple Authorized */}
        <div className="flex items-center space-x-3">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-blue-600">iOne</span>
            <span className="text-xs italic text-gray-500">The One You Trust</span>
          </div>
          <div className="h-6 border-l border-gray-300"></div>
          <div className="flex items-center space-x-1">
            <span className="text-2xl">🍏</span>
            <span className="text-sm text-gray-700">Authorized Reseller</span>
          </div>
        </div>

        {/* Middle: Nav links with dropdown */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700 relative">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <button className="hover:text-black">{item.label}</button>
              {openMenu === item.label && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md border py-2">
                  {item.submenu.map((sub, i) => (
                    <a
                      key={i}
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right: Search */}
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Search className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </nav>
    
      
    </div>
  )
}

export default Navbar
