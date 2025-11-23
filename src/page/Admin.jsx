import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, X, Save } from 'lucide-react';

const Admin = () => {
  const [filters, setFilters] = useState({
    name: '',
    category: 'all'
  });

  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Form state for adding new product
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'mac',
    qty: '',
    image: null
  });

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.name) params.append('name', filters.name);
      if (filters.category && filters.category !== 'all') params.append('category', filters.category);

      const response = await fetch(`http://localhost:4000/api/admin/products?${params.toString()}`);
      const data = await response.json();
      console.log('Fetched products:', data);
      
      // Backend now handles image URL transformation
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      alert('Failed to fetch products. Make sure backend is running on port 4000');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const handleClearFilter = () => {
    setFilters({ name: '', category: 'all' });
    setTimeout(() => fetchProducts(), 100);
  };

  // Add product handlers
  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setNewProduct(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('price', newProduct.price);
    formData.append('description', newProduct.description);
    formData.append('category', newProduct.category);
    formData.append('qty', newProduct.qty);
    if (newProduct.image) formData.append('image', newProduct.image);

    try {
      const response = await fetch('http://localhost:4000/api/products/add', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Product added successfully!');
        setShowAddForm(false);
        setNewProduct({
          name: '',
          price: '',
          description: '',
          category: 'mac',
          qty: '',
          image: null
        });
        fetchProducts();
      } else {
        alert('Failed to add product: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  // Edit product handlers
  const handleEditClick = (product) => {
    setEditingProduct({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description || '',
      category: product.category,
      qty: product.qty
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/products/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct)
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Product updated successfully!');
        setEditingProduct(null);
        fetchProducts();
      } else {
        alert('Failed to update product: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Delete product handler
  const handleDelete = async (product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/products/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: product.id,
          category: product.category
        })
      });

      const result = await response.json();
      
      if (result.success) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        alert('Failed to delete product: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">⚙️ ក្រប់ក្រងផលិតផល (Admin)</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-700">Filter តាមលក្ខខណ្ឌ</h2>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Product Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ឈ្មោះផលិតផល (Name)
                </label>
                <input
                  type="text"
                  name="name"
                  value={filters.name}
                  onChange={handleFilterChange}
                  placeholder="Search by name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ប្រភេទ (Category)
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">-- Category ទាំងអស់ --</option>
                  <option value="mac">Mac</option>
                  <option value="iphone">iPhone</option>
                  <option value="ipad">iPad</option>
                </select>
              </div>

              {/* Search by (placeholder for symmetry) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ស្វែងរកតាមលេខកូដផលិតផល
                </label>
                <input
                  type="text"
                  placeholder="Brake, Filter..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                <Search className="w-4 h-4" />
                {loading ? 'Loading...' : 'ស្វែងរក'}
              </button>
              <button
                type="button"
                onClick={handleClearFilter}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition"
              >
                Clear Filter
              </button>
            </div>
          </form>
        </div>

        {/* Add Product Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5" />
            Add New Product
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ឈ្មោះផលិតផល *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleNewProductChange}
                    required
                    placeholder="-- ឈ្មោះផលិតផល --"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleNewProductChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="mac">Mac</option>
                    <option value="iphone">iPhone</option>
                    <option value="ipad">iPad</option>
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    តម្លៃ ($) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleNewProductChange}
                    required
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ចំនួន (qty) *
                  </label>
                  <input
                    type="number"
                    name="qty"
                    value={newProduct.qty}
                    onChange={handleNewProductChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ពណ៌នាផលិតផល
                </label>
                <textarea
                  name="description"
                  value={newProduct.description}
                  onChange={handleNewProductChange}
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              {/* Image Upload */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  រូបភាពផលិតផល
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                >
                  <Plus className="w-4 h-4" />
                  បញ្ជូលទិន្នន័យ
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex items-center gap-2 bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">🗂️ បញ្ជីផលិតផល</h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">រូប</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ឈ្មោះ / ម៉ូឌែល / Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">តម្លៃ ($)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">អត្ថបទ</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ប្រតិបត្តិការ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                      No products found. Try adjusting your filters or add a new product.
                    </td>
                  </tr>
                ) : (
                  products.map((product, index) => (
                    <tr key={`${product.category}-${product.id}`} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                      
                      {/* Product Image */}
                      <td className="px-6 py-4">
                        <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center overflow-hidden border">
                          {product.image && product.image.trim() !== '' ? (
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-contain"
                              onError={(e) => { 
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/64?text=No+Image'; 
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <div className="text-center">
                              <div className="text-3xl">📦</div>
                              <span className="text-gray-400 text-xs">No image</span>
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Product Info */}
                      <td className="px-6 py-4">
                        {editingProduct && editingProduct.id === product.id && editingProduct.category === product.category ? (
                          <div className="space-y-2">
                            <input
                              type="text"
                              name="name"
                              value={editingProduct.name}
                              onChange={handleEditChange}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                            <div className="text-xs text-gray-500">
                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-sm text-gray-500">
                              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* Price & Quantity */}
                      <td className="px-6 py-4">
                        {editingProduct && editingProduct.id === product.id && editingProduct.category === product.category ? (
                          <div className="space-y-2">
                            <div>
                              <label className="text-xs text-gray-600">Price:</label>
                              <input
                                type="number"
                                name="price"
                                value={editingProduct.price}
                                onChange={handleEditChange}
                                step="0.01"
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600">Qty:</label>
                              <input
                                type="number"
                                name="qty"
                                value={editingProduct.qty}
                                onChange={handleEditChange}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                              />
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="font-medium text-gray-900">${parseFloat(product.price).toFixed(2)}</div>
                            <div className="text-sm text-gray-500">Qty: {product.qty}</div>
                          </div>
                        )}
                      </td>

                      {/* Description */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {editingProduct && editingProduct.id === product.id && editingProduct.category === product.category ? (
                          <textarea
                            name="description"
                            value={editingProduct.description}
                            onChange={handleEditChange}
                            rows="2"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                          ></textarea>
                        ) : (
                          <div className="max-w-xs truncate">{product.description || '-'}</div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        {editingProduct && editingProduct.id === product.id && editingProduct.category === product.category ? (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={handleSaveEdit}
                              className="flex items-center gap-1 bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                            >
                              <Save className="w-4 h-4" />
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              className="flex items-center gap-1 bg-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-400"
                            >
                              <X className="w-4 h-4" />
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(product)}
                              className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm hover:bg-blue-200"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(product)}
                              className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded text-sm hover:bg-red-200"
                            >
                              <Trash2 className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
