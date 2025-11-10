import React from 'react'
import { Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);

  const navItems = [
    { label: "Stores", route: "/", submenu: ["Phnom Penh", "Siem Reap", "Online Store"] },
    { label: "Mac", route: "/mac", submenu: ["MacBook Air", "MacBook Pro", "iMac", "Mac Mini"] },
    { label: "iPad", route: "/ipad", submenu: ["iPad Pro", "iPad Air", "iPad Mini"] },
    { label: "iPhone", route: "/iphone", submenu: ["iPhone 16 Pro", "iPhone 16", "iPhone SE"] },
    { label: "Watch", route: "/watch", submenu: ["Apple Watch Ultra", "Apple Watch Series 10", "Apple Watch SE"] },
    { label: "About us", route: "/about", submenu: ["Our Story"] },
    { label: "Add Product", route: "/add-product", submenu: ["Add New Product"] },
  ];
  return (
    <div>


    <nav className="w-full border-b bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Left: Logo + Apple Authorized */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-bold text-blue-600">iFive</span>
            <span className="text-xs italic text-gray-500">The One You Trust</span>
          </div>
          <div className="h-6 border-l border-gray-300"></div>
          <div className="flex items-center space-x-1">
            <span className="text-2xl">🍏</span>
            <span className="text-sm text-gray-700">Authorized Reseller</span>
          </div>
        </Link>

        {/* Middle: Nav links with dropdown */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-700 relative">
          {navItems.map((item, idx) => (
            <div
              key={idx}
              className="relative group"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link 
                to={item.route}
                className="hover:text-black transition-colors duration-200"
              >
                {item.label}
              </Link>
              {openMenu === item.label && (
                <div className="absolute left-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md border py-2">
                  {item.submenu.map((sub, i) => (
                    <Link
                      key={i}
                      to={item.route}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {sub}
                    </Link>
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
