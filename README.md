# Phone Store - E-commerce Website

A modern e-commerce website for Apple products (Mac, iPhone, iPad) built with React + Vite frontend and Node.js Express backend.

## 🎯 Features

- Browse products by category (Mac, iPhone, iPad)
- Shopping cart functionality
- Checkout process with customer information
- Add new products with image upload (Admin)
- Stock management
- Purchase history tracking

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Lucide Icons

### Backend
- Node.js
- Express.js
- MySQL (via mysql2)
- Multer (file uploads)
- CORS enabled

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Laragon (with MySQL/MariaDB)
- Web browser

### 1. Database Setup
Make sure Laragon MySQL is running and you have the `phonestore` database with:
- `mac` table
- `iphone` table
- `ipad` table
- `purchase_history` table

### 2. Start Backend Server
Open PowerShell Terminal 1:
```powershell
cd e:\laragon\www\Clones\ReactProject\src\backend
node server.js
```
Backend will run on: `http://localhost:4000`

### 3. Start Frontend Server
Open PowerShell Terminal 2:
```powershell
cd e:\laragon\www\Clones\ReactProject
npm run dev
```
Frontend will run on: `http://localhost:5173`

### 4. Alternative: Use Quick Start Script
```powershell
cd e:\laragon\www\Clones\ReactProject
.\start-servers.ps1
```

## 📁 Project Structure

```
ReactProject/
├── src/
│   ├── backend/           # Node.js API Server
│   │   ├── server.js      # Main server file
│   │   ├── db.js          # Database configuration
│   │   ├── .env           # Environment variables
│   │   └── test-db.js     # Database test utility
│   ├── components/        # React components
│   │   ├── AddProduct.jsx # Add product form
│   │   ├── Navbar.jsx     # Navigation + Cart
│   │   ├── ProductCard.jsx# Product display card
│   │   └── ...
│   ├── page/              # Page components
│   │   ├── Mac.jsx        # Mac products page
│   │   ├── iPhone.jsx     # iPhone products page
│   │   └── iPad.jsx       # iPad products page
│   └── phpform/uploads/   # Product images storage
├── MIGRATION_GUIDE.md     # Detailed migration & testing guide
├── MIGRATION_SUMMARY.md   # Quick migration summary
└── start-servers.ps1      # Quick start script

```

## 🔌 API Endpoints

Base URL: `http://localhost:4000/api/`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/products/by-category?category=<mac\|iphone\|ipad>` | Fetch products by category |
| POST | `/products/add` | Add new product (multipart/form-data) |
| POST | `/products/reduce-stock` | Reduce product stock |
| POST | `/purchases/record` | Record purchase history |

## 🧪 Testing

See `MIGRATION_GUIDE.md` for comprehensive testing checklist including:
- Product browsing
- Adding products
- Cart functionality
- Checkout process
- Stock reduction
- Purchase recording

## 📝 Backend Migration

This project was migrated from PHP backend to Node.js API. See:
- `MIGRATION_SUMMARY.md` - What changed
- `MIGRATION_GUIDE.md` - How to test & troubleshoot

## 🔧 Configuration

Backend configuration is in `src/backend/.env`:
```env
PORT=4000
DB_HOST=127.0.0.1
DB_USER=root
DB_PASS=
DB_NAME=phonestore
```

## 🐛 Troubleshooting

### Backend won't start
- Ensure Laragon MySQL is running
- Test database: `cd src/backend && node test-db.js`
- Check port 4000 is available

### Products not loading
- Verify backend is running on port 4000
- Check browser console for errors
- Verify database has products

### Images not displaying
- Check `src/phpform/uploads/` exists
- Verify file permissions
- Check image paths in database

For more help, see `MIGRATION_GUIDE.md`

## 📚 Documentation

- `README.md` - This file (quick start)
- `MIGRATION_SUMMARY.md` - Migration overview
- `MIGRATION_GUIDE.md` - Detailed guide with testing & troubleshooting

## ✨ Features Highlight

- ✅ RESTful API architecture
- ✅ File upload support
- ✅ Shopping cart with quantity management
- ✅ Real-time stock updates
- ✅ Purchase history tracking
- ✅ Responsive design
- ✅ Error handling & validation

## 🤝 Contributing

This is a school project. Contact the repository owner for contribution guidelines.

## 📄 License

MIT

---

**Ready to start?** Run `.\start-servers.ps1` or follow the Quick Start guide above! 🚀
