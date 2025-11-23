# 📊 Order Report Feature - Documentation

## Overview
The Order Report feature allows you to view, filter, and analyze your order history with powerful search capabilities.

## ✅ Implementation Complete

### Backend API
**Endpoint:** `GET /api/orders/report`

**Query Parameters:**
- `dateFrom` - Start date filter (YYYY-MM-DD)
- `dateTo` - End date filter (YYYY-MM-DD)
- `customer` - Search by customer name, phone, or email
- `status` - Filter by status (all, completed, pending, unknown)

**Response:**
```json
{
  "summary": {
    "totalOrders": 4,
    "totalAmount": 346.40,
    "amountPaid": 198.90,
    "balanceDue": 147.50
  },
  "orders": [
    {
      "id": 101,
      "orderNumber": "#101",
      "purchaseTime": "2025-11-17T09:00:48.000Z",
      "customer": {
        "fullName": "abc",
        "phone": "012333666",
        "email": "abc@example.com"
      },
      "products": [...],
      "total": 120.00,
      "amountPaid": 0.00,
      "balanceDue": 120.00,
      "status": "Pending"
    }
  ]
}
```

### Frontend Component
**Page:** `src/page/OrderReport.jsx`
**Route:** `/order-report`
**Navigation:** Added to Navbar as "📊 Order Report"

## 🎯 Features

### 1. Filter Options
- **Date Range:** Filter orders between two dates
- **Customer Search:** Search by name, phone, or email
- **Status Filter:** All / Completed / Pending / Unknown
- **Reset Button:** Clear all filters

### 2. Summary Cards (4 KPIs)
- Total Orders count
- Total Amount (sum of all order totals)
- Amount Paid (sum of all payments)
- Balance Due (sum of all outstanding balances)

### 3. Results Table
Display columns:
- Order # (sequential numbering)
- Order Number (#ID)
- Date/Time (formatted)
- Customer Info (name + phone)
- Status (colored badges)
- Total Amount
- Amount Paid
- Balance Due
- Show Items button (expandable)

### 4. Expandable Order Details
Click "Show Items" to reveal:
- Product list table
- Quantity, Price, Subtotal per product
- Customer email

### 5. Export Functionality
- Download report as CSV file
- Includes all visible filtered data
- Filename: `order-report-YYYY-MM-DD.csv`

## 🚀 How to Use

### Access the Report
1. Start both backend and frontend servers
2. Navigate to `/order-report` or click "📊 Order Report" in navbar
3. Report loads with all orders by default

### Filter Orders
1. **By Date:** Set "Date From" and "Date To" fields
2. **By Customer:** Enter name, phone, or email in search box
3. **By Status:** Select from dropdown (All/Completed/Pending/Unknown)
4. Click "ស្វែងរក (Search)" button

### View Order Details
1. Find order in results table
2. Click "Show Items" button on the right
3. Order expands to show product breakdown
4. Click again to collapse

### Export Report
1. Apply desired filters
2. Click "ទាញយក Report (Export)" button
3. CSV file downloads automatically

### Clear Filters
- Click "🔄 Clear Filter" button to reset all filters
- Report reloads with all orders

## 📋 Example Use Cases

### 1. Find Today's Orders
```
Date From: 2025-11-22
Date To: 2025-11-22
Customer: (empty)
Status: All
Click Search
```

### 2. Find Customer's Order History
```
Date From: (empty)
Date To: (empty)
Customer: John Smith
Status: All
Click Search
```

### 3. Find Pending Orders This Month
```
Date From: 2025-11-01
Date To: 2025-11-30
Customer: (empty)
Status: Pending
Click Search
```

### 4. Export Completed Orders Report
```
Status: Completed
Click Search
Click Export Report
```

## 🎨 UI Features

### Bilingual Interface
- Labels in both English and Khmer (ភាសាខ្មែរ)
- User-friendly for Cambodian market

### Color-Coded Status
- **Green badge:** Completed orders
- **Yellow badge:** Pending orders
- **Gray badge:** Unknown status

### Responsive Design
- Works on desktop, tablet, and mobile
- Scrollable table on small screens
- Grid layout adapts to screen size

### Loading States
- "Loading..." shown during data fetch
- Disabled buttons prevent double-clicks
- Smooth transitions and animations

## 🔧 Technical Details

### Database Table Used
- `purchase_history` table
- Columns: `id`, `full_name`, `phone`, `email`, `products` (JSON), `grand_total`, `purchase_time`

### Data Flow
1. User applies filters → Form submit
2. Frontend sends GET request to `/api/orders/report` with query params
3. Backend queries `purchase_history` with WHERE clauses
4. Backend calculates summary statistics
5. Backend returns JSON response
6. Frontend displays summary cards + table
7. User can expand rows to see order items

### Performance Notes
- Date filters use indexed `purchase_time` column
- LIKE searches on customer fields (name, phone, email)
- JSON parsing done in Node.js for `products` field
- Orders sorted by `purchase_time DESC` (newest first)

## 🐛 Troubleshooting

### No Orders Showing
- Check if you have purchase history data
- Try clearing filters (Reset button)
- Check browser console for errors
- Verify backend is running on port 4000

### Date Filter Not Working
- Use YYYY-MM-DD format
- Make sure "Date From" is before "Date To"
- Check timezone compatibility

### Customer Search Not Finding Results
- Try partial name (e.g., "John" instead of "John Smith")
- Try searching by phone number
- Check for typos in customer data

### Export Not Working
- Check browser allows downloads
- Try different browser if issues persist
- Verify you have orders in filtered results

## 📈 Future Enhancements (Optional)

1. **Pagination:** Add page navigation for large datasets
2. **Date Presets:** Quick filters (Today, This Week, This Month)
3. **Advanced Filters:** Price range, product category
4. **Charts:** Visual graphs of sales trends
5. **Print View:** Printer-friendly format
6. **PDF Export:** Generate PDF instead of CSV
7. **Order Details Page:** Click order to see full detail page
8. **Partial Payments:** Support for multiple payment records per order

---

## ✅ Implementation Summary

- ✅ Backend API endpoint created
- ✅ Frontend component built
- ✅ Route added to App.jsx
- ✅ Navigation menu updated
- ✅ Filters working (date, customer, status)
- ✅ Summary cards calculating totals
- ✅ Expandable order items
- ✅ CSV export functionality
- ✅ Responsive design
- ✅ No errors in code

**Status:** Ready to use! 🎉

Navigate to `http://localhost:5173/order-report` after starting servers.
