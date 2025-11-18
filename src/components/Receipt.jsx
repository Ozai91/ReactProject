import React from 'react';

export default function Receipt({ customer, products, grandTotal, datetime, onClose }) {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/45 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-md mx-auto shadow-2xl p-8 relative animate-popIn">
        <button
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-xl font-bold focus:outline-none"
          onClick={onClose}
        >×</button>
        <h2 className="text-2xl font-bold mb-2 text-center">Receipt</h2>
        <div className="text-sm text-center text-gray-500 mb-4">{datetime}</div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Customer Information</h3>
          <div className="bg-gray-50 rounded p-3">
            <div><span className="font-medium">Name:</span> {customer.fullName}</div>
            <div><span className="font-medium">Phone:</span> {customer.phone}</div>
            <div><span className="font-medium">Email:</span> {customer.email}</div>
          </div>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Products</h3>
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
                {products.map((item, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3 text-center">{item.quantity}</td>
                    <td className="py-2 px-3 text-right">${item.price}</td>
                    <td className="py-2 px-3 text-right">${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="text-right text-lg font-bold mb-4">Grand Total: <span className="text-blue-600">${grandTotal.toFixed(2)}</span></div>
        <div className="flex justify-center">
          <button className="rounded-lg bg-blue-600 hover:bg-blue-700 py-2 px-6 text-white font-semibold transition" onClick={onClose}>Back to Shop</button>
        </div>
      </div>
    </div>
  );
}
