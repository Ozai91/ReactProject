import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CheckoutForm({ open, onClose, onConfirm }) {
  const { cartItems, getTotalPrice } = useCart();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  // Validate inputs
  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Full Name is required.';
    if (!phone.trim()) errs.phone = 'Phone Number is required.';
    else if (!/^\d{7,15}$/.test(phone.trim())) errs.phone = 'Enter a valid phone number.';
    if (!email.trim()) errs.email = 'Email is required.';
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) errs.email = 'Enter a valid email address.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onConfirm({ fullName, phone, email });
  };

  // Simple fade/slide anim, modal card style
  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center transition-all duration-300 ${open ? 'visible bg-black/40' : 'invisible bg-transparent'}`}
      style={{ transitionProperty: 'visibility, background-color' }}
    >
      <div className={`relative w-full max-w-lg mx-auto rounded-xl bg-white p-8 shadow-2xl transition-all duration-300 ${open ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}
           style={{ transitionProperty: 'transform, opacity' }}>
        <button
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold focus:outline-none"
          onClick={onClose}
        >×</button>
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Full Name<span className="text-red-500">*</span></label>
            <input type="text" className={`w-full px-4 py-2 rounded-md border ${errors.fullName ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring`} value={fullName} onChange={e => setFullName(e.target.value)} />
            {errors.fullName && <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number<span className="text-red-500">*</span></label>
            <input type="tel" className={`w-full px-4 py-2 rounded-md border ${errors.phone ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring`} value={phone} onChange={e => setPhone(e.target.value)} />
            {errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
          </div>
          <div>
            <label className="block font-medium mb-1">Email<span className="text-red-500">*</span></label>
            <input type="email" className={`w-full px-4 py-2 rounded-md border ${errors.email ? 'border-red-400' : 'border-gray-300'} focus:outline-none focus:ring`} value={email} onChange={e => setEmail(e.target.value)} />
            {errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
          </div>
          {/* Cart product summary table */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-2 px-3 text-left font-medium">Product</th>
                    <th className="py-2 px-3 text-center font-medium">Qty</th>
                    <th className="py-2 px-3 text-right font-medium">Price</th>
                    <th className="py-2 px-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="py-2 px-3">{item.name}</td>
                      <td className="py-2 px-3 text-center">{item.quantity}</td>
                      <td className="py-2 px-3 text-right">${item.price}</td>
                      <td className="py-2 px-3 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-3">
              <div className="font-bold text-lg">Grand Total: <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span></div>
            </div>
          </div>
          {/* Action buttons */}
          <div className="flex gap-3 mt-8">
            <button type="button" className="w-1/2 rounded-lg bg-gray-200 hover:bg-gray-300 py-2 text-gray-700 font-semibold transition" onClick={onClose}>Back to Shop</button>
            <button type="submit" className="w-1/2 rounded-lg bg-blue-600 hover:bg-blue-700 py-2 text-white font-semibold transition">Confirm Purchase</button>
          </div>
        </form>
      </div>
    </div>
  );
}
