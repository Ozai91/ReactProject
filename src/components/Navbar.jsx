import React from 'react'
import { Search, ShoppingCart, X, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from '../context/CartContext';


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartItems, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

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

        {/* Right: Search and Cart */}
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Search className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Cart Button */}
          <div className="relative">
            <button 
              onClick={() => setCartOpen(!cartOpen)}
              className="p-2 hover:bg-gray-100 rounded-full relative"
            >
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* Cart Dropdown */}
            {cartOpen && (
              <>
                {/* Backdrop */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setCartOpen(false)}
                ></div>
                
                {/* Cart Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-96 bg-white shadow-xl rounded-lg border z-50 max-h-[600px] flex flex-col">
                  {/* Cart Header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <h3 className="text-lg font-semibold">My Cart</h3>
                    <button
                      onClick={() => setCartOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded-full"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>

                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <ShoppingCart className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                        <p>Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 pb-4 border-b last:border-0">
                            {/* Product Image */}
                            <div className="w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                              <img
                                src={
                                  item.image?.startsWith('http')
                                    ? item.image
                                    : item.image?.startsWith('/')
                                    ? `http://localhost${item.image}`
                                    : `http://localhost/${item.image || ''}`
                                }
                                alt={item.name}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                  e.target.src = 'https://via.placeholder.com/80?text=No+Image';
                                }}
                              />
                            </div>

                            {/* Product Details */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm mb-1 truncate">{item.name}</h4>
                              <p className="text-blue-600 font-bold mb-2">${item.price}</p>
                              
                              {/* Quantity Controls */}
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-gray-100 rounded border"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-gray-100 rounded border"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 p-1"
                              aria-label="Remove item"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Cart Footer */}
                  {cartItems.length > 0 && (
                    <div className="p-4 border-t bg-gray-50">
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-semibold">Total:</span>
                        <span className="text-xl font-bold text-blue-600">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
    
      
    </div>
  )
}

export default Navbar
