import React, { useState, useEffect } from 'react';
import { Search, Download, ChevronDown, ChevronUp } from 'lucide-react';

const OrderReport = () => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    customer: '',
    status: 'all'
  });
  
  const [reportData, setReportData] = useState({
    summary: {
      totalOrders: 0,
      totalAmount: 0,
      amountPaid: 0,
      balanceDue: 0
    },
    orders: []
  });
  
  const [expandedOrders, setExpandedOrders] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Fetch report data
  const fetchReport = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.append('dateTo', filters.dateTo);
      if (filters.customer) params.append('customer', filters.customer);
      if (filters.status && filters.status !== 'all') params.append('status', filters.status);

      const response = await fetch(`http://localhost:4000/api/orders/report?${params.toString()}`);
      const data = await response.json();
      
      if (data.error) {
        console.error('Error:', data.error);
        return;
      }
      
      setReportData(data);
    } catch (error) {
      console.error('Failed to fetch report:', error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchReport();
  };

  const handleReset = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      customer: '',
      status: 'all'
    });
    setTimeout(() => fetchReport(), 100);
  };

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleExport = () => {
    // Simple CSV export
    const headers = ['Order #', 'Date/Time', 'Customer', 'Phone', 'Status', 'Total', 'Paid', 'Balance'];
    const rows = reportData.orders.map(order => [
      order.orderNumber,
      new Date(order.purchaseTime).toLocaleString(),
      order.customer.fullName,
      order.customer.phone,
      order.status,
      `$${order.total.toFixed(2)}`,
      `$${order.amountPaid.toFixed(2)}`,
      `$${order.balanceDue.toFixed(2)}`
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `order-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">📊 Report – Orders & Order Items</h1>
          <p className="text-gray-600">Filter and analyze your order history</p>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Search className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-700">Filter</h2>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              {/* Date From */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  កាលបរិច្ឆេទ (Date From)
                </label>
                <input
                  type="date"
                  name="dateFrom"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ដល់កាលបរិច្ឆេទ (Date To)
                </label>
                <input
                  type="date"
                  name="dateTo"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Customer Search */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  អតិថិជន / ឈ្មោះអតិថិជន (Customer)
                </label>
                <input
                  type="text"
                  name="customer"
                  value={filters.customer}
                  onChange={handleFilterChange}
                  placeholder="Name, phone, or email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ស្ថានភាព (Status)
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">ទាំងអស់ (All)</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="unknown">Unknown</option>
                </select>
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
                {loading ? 'Loading...' : 'ស្វែងរក (Search)'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition"
              >
                🔄 Clear Filter
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition ml-auto"
              >
                <Download className="w-4 h-4" />
                ទាញយក Report (Export)
              </button>
            </div>
          </form>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">ចំនួន Order</p>
            <p className="text-3xl font-bold text-gray-800">{reportData.summary.totalOrders}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Total Amount</p>
            <p className="text-3xl font-bold text-blue-600">${reportData.summary.totalAmount.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
            <p className="text-3xl font-bold text-green-600">${reportData.summary.amountPaid.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-1">Balance Due</p>
            <p className="text-3xl font-bold text-orange-600">${reportData.summary.balanceDue.toFixed(2)}</p>
          </div>
        </div>

        {/* Results Label */}
        <div className="bg-cyan-100 rounded-t-lg px-6 py-3">
          <p className="text-sm font-medium text-cyan-800">
            រកឃើញ {reportData.orders.length} ការប្រព័ន្ធ (Found {reportData.orders.length} orders)
          </p>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-b-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">លេខកម្មង់ Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">កាលបរិច្ឆេទ Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">អតិថិជន Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ស្ថានភាព Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">បញ្ជីទំនិញ Items</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {reportData.orders.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-6 py-8 text-center text-gray-500">
                      No orders found. Try adjusting your filters.
                    </td>
                  </tr>
                ) : (
                  reportData.orders.map((order, index) => (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.orderNumber}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{formatDateTime(order.purchaseTime)}</td>
                        <td className="px-6 py-4 text-sm">
                          <div className="font-medium text-gray-900">{order.customer.fullName}</div>
                          <div className="text-gray-500 text-xs">{order.customer.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-right font-medium text-gray-900">${order.total.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-right text-green-600">${order.amountPaid.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-right text-orange-600">${order.balanceDue.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-right">
                          <button
                            onClick={() => toggleOrderExpand(order.id)}
                            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 ml-auto"
                          >
                            Show Items
                            {expandedOrders.has(order.id) ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedOrders.has(order.id) && (
                        <tr>
                          <td colSpan="9" className="px-6 py-4 bg-gray-50">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-gray-700 mb-2">Order Items:</h4>
                              <div className="bg-white rounded border">
                                <table className="w-full text-sm">
                                  <thead className="bg-gray-100">
                                    <tr>
                                      <th className="px-4 py-2 text-left">Product</th>
                                      <th className="px-4 py-2 text-center">Quantity</th>
                                      <th className="px-4 py-2 text-right">Price</th>
                                      <th className="px-4 py-2 text-right">Subtotal</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y">
                                    {order.products.map((product, idx) => (
                                      <tr key={idx}>
                                        <td className="px-4 py-2">{product.name}</td>
                                        <td className="px-4 py-2 text-center">{product.quantity}</td>
                                        <td className="px-4 py-2 text-right">${parseFloat(product.price).toFixed(2)}</td>
                                        <td className="px-4 py-2 text-right font-medium">
                                          ${(parseFloat(product.price) * product.quantity).toFixed(2)}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                              <div className="text-right text-sm text-gray-600 mt-2">
                                <strong>Customer Email:</strong> {order.customer.email}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
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

export default OrderReport;
