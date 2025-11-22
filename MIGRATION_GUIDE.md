# Backend Migration - Setup and Testing Guide

## ✅ Migration Complete!

Your website has been successfully migrated from PHP backend to Node.js API.

## 🔧 What Was Changed

### Backend Changes:
1. **Database Configuration** (`.env`)
   - Changed DB_NAME from `auto888Orderuc2m1` to `phonestore`
   - Using existing database with mac, iphone, ipad, purchase_history tables

2. **Server Configuration** (`server.js`)
   - Added upload directory: `../phpform/uploads/` (same as PHP)
   - Added 4 new API endpoints:
     * `POST /api/products/add` - Add new product with image upload
     * `GET /api/products/by-category?category=<mac|iphone|ipad>` - Fetch products
     * `POST /api/products/reduce-stock` - Reduce product stock after purchase
     * `POST /api/purchases/record` - Record purchase history
   - Added error handlers for better debugging

3. **Test Script** (`test-db.js`)
   - Database connection test utility
   - Verified: ✅ Connection successful, 12 Mac products found

### Frontend Changes:
1. **ProductCard.jsx**
   - Added `category` prop to track product category
   - Passes category to cart when adding items

2. **AddProduct.jsx**
   - Changed API endpoint from PHP to: `http://localhost:4000/api/products/add`
   - Same FormData structure (name, price, description, category, qty, image)

3. **Navbar.jsx** (Cart & Checkout Logic)
   - Updated `reduceStock.php` → `http://localhost:4000/api/products/reduce-stock`
   - Updated `purchase.php` → `http://localhost:4000/api/purchases/record`

4. **Product Pages** (Mac.jsx, iPhone.jsx, iPad.jsx)
   - Updated `getProducts.php` → `http://localhost:4000/api/products/by-category`
   - Added `category` prop to ProductCard components

## 🚀 How to Run

### 1. Start MySQL/MariaDB in Laragon
Make sure Laragon is running and MySQL service is active.

### 2. Start Backend Server (Terminal 1)
```powershell
cd e:\laragon\www\Clones\ReactProject\src\backend
node server.js
```
You should see: `API ready on http://localhost:4000`

### 3. Start React Frontend (Terminal 2)
```powershell
cd e:\laragon\www\Clones\ReactProject
npm run dev
```
Your website will be available at: `http://localhost:5173` (or the port shown)

## 🧪 Testing Checklist

### Test 1: Fetch Products by Category
1. Navigate to Mac page (`/mac`)
2. Products should load from database
3. Repeat for iPhone (`/iphone`) and iPad (`/ipad`)

### Test 2: Add New Product
1. Go to Add Product page
2. Fill in form:
   - Product Name: "Test MacBook"
   - Price: 999.99
   - Description: "Test product"
   - Category: Mac
   - Quantity: 5
   - Image: Upload any image
3. Click "Add Product"
4. Should see success message
5. Navigate to Mac page to verify product appears

### Test 3: Add to Cart
1. On any product page, click "Add to cart"
2. Click cart icon in navbar
3. Product should appear in cart
4. Test quantity increase/decrease
5. Test remove product

### Test 4: Complete Checkout
1. Add multiple products to cart
2. Click "Checkout"
3. Fill in customer info:
   - Full Name: "Test User"
   - Phone: "0123456789"
   - Email: "test@example.com"
4. Click "Confirm Purchase"
5. Should see receipt
6. Verify stock was reduced (check database or try adding same product again)
7. Verify purchase was recorded (check `purchase_history` table)

## 📊 Database Verification (Optional)

You can verify the changes in the database using phpMyAdmin or MySQL command line:

```sql
-- Check products
SELECT * FROM mac ORDER BY id DESC LIMIT 5;

-- Check purchase history
SELECT * FROM purchase_history ORDER BY id DESC LIMIT 5;

-- Check specific product stock
SELECT name, qty FROM mac WHERE id = 1;
```

## 🐛 Troubleshooting

### Backend won't start
- **Error: Cannot connect to database**
  - Make sure Laragon MySQL is running
  - Run test script: `node test-db.js`
  - Check `.env` credentials

- **Error: Port 4000 already in use**
  - Change PORT in `.env` to another port (e.g., 4001)
  - Update frontend API calls to match new port

### Frontend errors
- **Error: Failed to fetch**
  - Make sure backend server is running on port 4000
  - Check browser console for CORS errors
  - Verify API endpoint URLs in code

- **Images not displaying**
  - Make sure `src/phpform/uploads/` directory exists
  - Check file permissions
  - Verify image paths in database

### Products not loading
- **Empty product list**
  - Check database has products in mac/iphone/ipad tables
  - Run: `node test-db.js` to verify connection
  - Check browser Network tab for API response

## 📝 API Endpoints Reference

All endpoints use base URL: `http://localhost:4000/api/`

### GET /products/by-category
Fetch products by category
- **Query Params:** `category` (mac|iphone|ipad)
- **Response:** Array of products
```json
[{
  "id": 1,
  "name": "MacBook Air",
  "price": 999,
  "description": "...",
  "image": "http://localhost/...",
  "category": "mac",
  "qty": 10
}]
```

### POST /products/add
Add new product with image
- **Content-Type:** multipart/form-data
- **Body:** name, price, description, category, qty, image (file)
- **Response:** `{ success: true, message: "Product added successfully", id: 123 }`

### POST /products/reduce-stock
Reduce product stock
- **Content-Type:** application/json
- **Body:** `{ id, category, quantity }`
- **Response:** `{ success: true, message: "Stock updated successfully" }`

### POST /purchases/record
Record purchase history
- **Content-Type:** application/json
- **Body:** `{ customer: {...}, products: [...], grandTotal, datetime }`
- **Response:** `{ success: true, message: "Purchase recorded successfully", id: 456 }`

## ✨ Benefits of Node.js Backend

1. **Single Language:** JavaScript/Node.js instead of PHP
2. **Better Error Handling:** Structured error responses
3. **Modern Stack:** Express.js with async/await
4. **Easy Debugging:** Console logs and error handlers
5. **Scalability:** Can add authentication, WebSockets, etc.
6. **Version Control:** No need for separate PHP server config

## 📚 Next Steps (Optional Improvements)

1. **Add Input Validation:** Use express-validator for request validation
2. **Add Authentication:** Protect AddProduct endpoint with JWT
3. **Image Optimization:** Compress images on upload
4. **Database Migration:** Consider unifying mac/iphone/ipad into single products table
5. **Error Logging:** Add winston or similar for production logging
6. **Environment Config:** Use different .env files for dev/production

---

## 🎉 Success!

Your backend migration is complete. The functionality remains the same as before, but now using a modern Node.js API instead of PHP!

If you encounter any issues, check the console logs in both backend terminal and browser developer tools.
