import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import multer from "multer";
import { fileURLToPath } from "url";
import { pool } from "./db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// --- Paths ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadDir = path.join(__dirname, "..", "phpform", "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(uploadDir));

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`);
  },
});
const upload = multer({ storage });

// --- Utils ---
const n = (v, d = 0) => (Number.isFinite(Number(v)) ? Number(v) : d);
const b = (v) => v === true || v === "1" || v === 1 || v === "true";
const publicUrl = (filename) => (filename ? `/uploads/${path.basename(filename)}` : null);

// ---------------- Car Make/Model/Category (GETs for filters) ----------------
app.get("/carmakes", async (_req, res) => {
  const [rows] = await pool.query("SELECT id, name FROM car_make ORDER BY name");
  res.json(rows);
});
app.get("/carmodels", async (req, res) => {
  const { make } = req.query;
  if (!make) return res.json([]);
  const [rows] = await pool.query("SELECT id, name FROM car_model WHERE make_id=?", [n(make)]);
  res.json(rows);
});
app.get("/categories", async (req, res) => {
  const { model } = req.query;
  if (!model) return res.json([]);
  const [rows] = await pool.query(
    "SELECT id, category_name AS categoryName FROM category WHERE model_id=?",
    [n(model)]
  );
  res.json(rows);
});

// ---------------- Customers ----------------
app.get("/customers", async (req, res) => {
  try {
    const { q = "", page = 1, pageSize = 100 } = req.query;
    const ps = n(pageSize, 100);
    const off = (n(page, 1) - 1) * ps;
    const [rows] = await pool.query(
      "SELECT id, name, phone FROM customer WHERE name LIKE ? OR phone LIKE ? ORDER BY id DESC LIMIT ? OFFSET ?",
      [`%${q}%`, `%${q}%`, ps, off]
    );
    res.json(rows);
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});
app.post("/customers", async (req, res) => {
  try {
    const { name, phone } = req.body || {};
    if (!name || !name.trim()) return res.status(400).json({ error: "Name is required" });
    const [r] = await pool.query(
      "INSERT INTO customer (name, phone) VALUES (?,?)",
      [name.trim(), phone?.trim() || null]
    );
    res.status(201).json({ id: r.insertId, name: name.trim(), phone: phone?.trim() || null });
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Products (filter/search/sort) ----------------
app.get("/products", async (req, res) => {
  try {
    const {
      categoryID,
      search = "",
      price = "",
      priceMin = "",
      priceMax = "",
      sort = "",
      page = 1,
      pageSize = 100,
    } = req.query;

    if (!categoryID) return res.status(400).json({ error: "categoryID is required" });

    const where = ["p.category_id = ?"];
    const args = [n(categoryID)];

    if (search) {
      where.push("(p.product_name LIKE ? OR p.description LIKE ?)");
      args.push(`%${search}%`, `%${search}%`);
    }
    if (price !== "") { where.push("p.price = ?"); args.push(n(price)); }
    if (priceMin !== "") { where.push("p.price >= ?"); args.push(n(priceMin)); }
    if (priceMax !== "") { where.push("p.price <= ?"); args.push(n(priceMax)); }

    const orderBy =
      sort === "asc" ? "p.price ASC" : sort === "desc" ? "p.price DESC" : "p.product_name ASC";

    const ps = n(pageSize, 100);
    const off = (n(page, 1) - 1) * ps;

    const [rows] = await pool.query(
      `
      SELECT p.id, p.product_name AS productName, p.price,
             NULLIF(p.product_image,'') AS productImage, p.description
      FROM product p
      WHERE ${where.join(" AND ")}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
      `,
      [...args, ps, off]
    );

    res.json(rows);
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Product Details ----------------
app.get("/productdetails", async (req, res) => {
  try {
    const { productID } = req.query;
    if (!productID) return res.status(400).json({ error: "productID is required" });
    const [rows] = await pool.query(
      `SELECT id, product_id AS productID, product_detail_name AS productDetailName,
              Description, Information, Reviews
       FROM product_detail WHERE product_id=? ORDER BY id ASC`,
      [n(productID)]
    );
    res.json(rows);
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});

// ---------------- QR Codes ----------------
app.get("/qrcodes", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, qr_name AS qrName, qr_image AS qrImage FROM qrcode ORDER BY id DESC"
    );
    const mapped = rows.map((r) => ({
      ...r,
      qrImage: r.qrImage && !/^https?:\/\//i.test(r.qrImage) ? publicUrl(r.qrImage) : r.qrImage,
    }));
    res.json(mapped);
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Orders ----------------
async function readOrderFull(orderId) {
  const [o1] = await pool.query(
    `SELECT o.id, o.customer_id, c.name AS customerName, c.phone AS customerPhone,
            o.employee_id, o.total_amount AS totalAmount, o.status_id AS status,
            o.amount_paid, o.balance_due, o.due_date, o.is_paid,
            o.order_date AS orderDate,
            o.invoice_image AS invoiceImage, o.qr_code_invoice AS QRCodeInvoice
     FROM orders o
     LEFT JOIN customer c ON c.id = o.customer_id
     WHERE o.id=?`,
    [orderId]
  );
  if (o1.length === 0) return null;
  const order = o1[0];

  const [items] = await pool.query(
    `SELECT oi.id, oi.product_id AS product, p.product_name AS productName,
            oi.qty, oi.price
     FROM order_item oi
     LEFT JOIN product p ON p.id = oi.product_id
     WHERE oi.order_id=? ORDER BY oi.id ASC`,
    [orderId]
  );
  order.order_items = items;

  order.invoiceImage =
    order.invoiceImage && !/^https?:\/\//i.test(order.invoiceImage)
      ? publicUrl(order.invoiceImage)
      : order.invoiceImage;
  order.QRCodeInvoice =
    order.QRCodeInvoice && !/^https?:\/\//i.test(order.QRCodeInvoice)
      ? publicUrl(order.QRCodeInvoice)
      : order.QRCodeInvoice;

  return order;
}

app.get("/orders", async (_req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT o.id, o.customer_id, c.name AS customerName, c.phone AS customerPhone,
              o.total_amount AS totalAmount, o.order_date AS orderDate
       FROM orders o
       LEFT JOIN customer c ON c.id = o.customer_id
       ORDER BY o.id DESC
       LIMIT 200`
    );

    for (const r of rows) {
      const [items] = await pool.query(
        `SELECT oi.product_id AS product, p.product_name AS productName, oi.qty, oi.price
         FROM order_item oi
         LEFT JOIN product p ON p.id = oi.product_id
         WHERE oi.order_id=? ORDER BY oi.id ASC`,
        [r.id]
      );
      r.order_items = items;
    }

    res.json(rows);
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const order = await readOrderFull(n(req.params.id));
    if (!order) return res.status(404).json({ error: "Not found" });
    res.json(order);
  } catch (e) {
    console.error(e); res.status(500).json({ error: "Server error" });
  }
});

app.post(
  "/orders",
  upload.fields([
    { name: "invoiceImage", maxCount: 1 },
    { name: "QRCodeInvoice", maxCount: 1 },
  ]),
  async (req, res) => {
    const f = req.body || {};
    const files = req.files || {};
    try {
      const customer = n(f.customer);
      if (!customer) return res.status(400).json({ error: "customer is required" });

      const employee = n(f.employee, null);
      const totalAmount = n(f.totalAmount, 0);
      const status = n(f.status, null);
      const amount_paid = n(f.amount_paid, 0);
      const balance_due = n(f.balance_due, Math.max(0, totalAmount - amount_paid));
      const due_date = f.due_date || null;
      const is_paid = b(f.is_paid) ? 1 : 0;

      const invoiceImage = files?.invoiceImage?.[0]?.filename || null;
      const QRCodeInvoice = files?.QRCodeInvoice?.[0]?.filename || null;

      let items = [];
      try {
        items = JSON.parse(f.items || "[]");
      } catch {
        items = [];
      }
      if (!Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: "items is required" });
      }

      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();

        const [r] = await conn.query(
          `INSERT INTO orders
             (customer_id, employee_id, total_amount, status_id, amount_paid, balance_due, due_date, is_paid, invoice_image, qr_code_invoice)
           VALUES (?,?,?,?,?,?,?,?,?,?)`,
          [customer, employee, totalAmount, status, amount_paid, balance_due, due_date, is_paid, invoiceImage, QRCodeInvoice]
        );
        const orderId = r.insertId;

        for (const it of items) {
          const pid = n(it.product);
          const qty = n(it.qty, 1);
          const price = n(it.price, 0);
          await conn.query(
            "INSERT INTO order_item (order_id, product_id, qty, price) VALUES (?,?,?,?)",
            [orderId, pid, qty, price]
          );
        }

        await conn.commit();

        const order = await readOrderFull(orderId);
        res.status(201).json(order);
      } catch (e) {
        await conn.rollback();
        console.error(e);
        res.status(500).json({ error: "Failed to create order" });
      } finally {
        conn.release();
      }
    } catch (e) {
      console.error(e); res.status(500).json({ error: "Server error" });
    }
  }
);

// ---------------- NEW: Phone Store API Endpoints ----------------
// 1. Add Product (replaces formtest.php)
app.post("/api/products/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, category, qty } = req.body;
    
    // Validate required fields
    if (!name || !price || !category) {
      return res.status(400).json({ error: "Name, price, and category are required" });
    }

    // Validate category and map to table name
    const validCategories = { mac: "mac", iphone: "iphone", ipad: "ipad" };
    const tableName = validCategories[category.toLowerCase()];
    if (!tableName) {
      return res.status(400).json({ error: "Invalid category. Must be mac, iphone, or ipad" });
    }

    // Generate image URL (matching PHP format)
    const imageUrl = req.file 
      ? `http://localhost/Clones/ReactProject/src/phpform/uploads/${req.file.filename}`
      : null;

    // Insert into category-specific table
    const [result] = await pool.query(
      `INSERT INTO ${tableName} (name, price, descript, img, category, qty) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, n(price), description || "", imageUrl, category, n(qty, 0)]
    );

    res.status(201).json({ 
      success: true, 
      message: "Product added successfully",
      id: result.insertId 
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add product" });
  }
});

// 2. Get Products by Category (replaces getProducts.php)
app.get("/api/products/by-category", async (req, res) => {
  try {
    const { category = "mac" } = req.query;

    // Validate category and map to table name
    const validCategories = { mac: "mac", iphone: "iphone", ipad: "ipad" };
    const tableName = validCategories[category.toLowerCase()];
    if (!tableName) {
      return res.status(400).json({ error: "Invalid category. Must be mac, iphone, or ipad" });
    }

    // Query products from category-specific table
    const [rows] = await pool.query(
      `SELECT id, name, price, descript AS description, img AS image, category, qty 
       FROM ${tableName} 
       ORDER BY id DESC`
    );

    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// 3. Reduce Product Stock (replaces reduceStock.php)
app.post("/api/products/reduce-stock", async (req, res) => {
  try {
    const { id, category, quantity } = req.body;

    // Validate required fields
    if (!id || !category || !quantity) {
      return res.status(400).json({ error: "ID, category, and quantity are required" });
    }

    // Validate category and map to table name
    const validCategories = { mac: "mac", iphone: "iphone", ipad: "ipad" };
    const tableName = validCategories[category.toLowerCase()];
    if (!tableName) {
      return res.status(400).json({ error: "Invalid category. Must be mac, iphone, or ipad" });
    }

    // Check current stock
    const [rows] = await pool.query(
      `SELECT qty FROM ${tableName} WHERE id = ?`,
      [n(id)]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const currentQty = n(rows[0].qty, 0);
    const reduceBy = n(quantity, 0);

    if (currentQty < reduceBy) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    // Update stock
    await pool.query(
      `UPDATE ${tableName} SET qty = qty - ? WHERE id = ?`,
      [reduceBy, n(id)]
    );

    res.json({ success: true, message: "Stock updated successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to reduce stock" });
  }
});

// 4. Record Purchase (replaces purchase.php)
app.post("/api/purchases/record", async (req, res) => {
  try {
    const { customer, products, grandTotal, datetime } = req.body;

    // Validate required fields
    if (!customer || !products || !grandTotal) {
      return res.status(400).json({ error: "Customer, products, and grandTotal are required" });
    }

    // Validate customer fields
    if (!customer.fullName || !customer.phone || !customer.email) {
      return res.status(400).json({ error: "Customer fullName, phone, and email are required" });
    }

    // Insert into purchase_history table
    const [result] = await pool.query(
      `INSERT INTO purchase_history (full_name, phone, email, products, grand_total, purchase_time) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        customer.fullName,
        customer.phone,
        customer.email,
        JSON.stringify(products),
        n(grandTotal),
        datetime || new Date().toISOString()
      ]
    );

    res.status(201).json({ 
      success: true, 
      message: "Purchase recorded successfully",
      id: result.insertId 
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to record purchase" });
  }
});

// 5. Order Report (NEW - for filtering and viewing order history)
app.get("/api/orders/report", async (req, res) => {
  try {
    const { dateFrom, dateTo, customer, status } = req.query;

    // Build WHERE clause dynamically
    const where = [];
    const args = [];

    // Date range filter
    if (dateFrom) {
      where.push("purchase_time >= ?");
      args.push(dateFrom);
    }
    if (dateTo) {
      // Add one day to include the entire "to" date
      const toDatePlusOne = new Date(dateTo);
      toDatePlusOne.setDate(toDatePlusOne.getDate() + 1);
      where.push("purchase_time < ?");
      args.push(toDatePlusOne.toISOString().split('T')[0]);
    }

    // Customer search filter (name, phone, or email)
    if (customer && customer.trim()) {
      where.push("(full_name LIKE ? OR phone LIKE ? OR email LIKE ?)");
      const searchTerm = `%${customer.trim()}%`;
      args.push(searchTerm, searchTerm, searchTerm);
    }

    // Build query
    const whereClause = where.length > 0 ? `WHERE ${where.join(" AND ")}` : "";
    
    // Get all orders matching filters
    const [orders] = await pool.query(
      `SELECT id, full_name, phone, email, products, grand_total, purchase_time
       FROM purchase_history
       ${whereClause}
       ORDER BY purchase_time DESC`,
      args
    );

    // Parse products JSON and calculate totals
    const processedOrders = orders.map(order => {
      let products = [];
      try {
        products = JSON.parse(order.products);
      } catch (e) {
        console.error('Failed to parse products for order', order.id, e);
      }

      // Calculate paid amount (for now, assume fully paid if status would be "Completed")
      const totalAmount = parseFloat(order.grand_total) || 0;
      const amountPaid = totalAmount; // In your simple system, orders are paid in full
      const balanceDue = 0;

      return {
        id: order.id,
        orderNumber: `#${order.id}`,
        purchaseTime: order.purchase_time,
        customer: {
          fullName: order.full_name,
          phone: order.phone,
          email: order.email
        },
        products: products,
        total: totalAmount,
        amountPaid: amountPaid,
        balanceDue: balanceDue,
        status: balanceDue > 0 ? 'Pending' : 'Completed'
      };
    });

    // Apply status filter if provided (after processing)
    let filteredOrders = processedOrders;
    if (status && status !== 'all') {
      filteredOrders = processedOrders.filter(order => 
        order.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Calculate summary statistics
    const summary = {
      totalOrders: filteredOrders.length,
      totalAmount: filteredOrders.reduce((sum, order) => sum + order.total, 0),
      amountPaid: filteredOrders.reduce((sum, order) => sum + order.amountPaid, 0),
      balanceDue: filteredOrders.reduce((sum, order) => sum + order.balanceDue, 0)
    };

    res.json({
      summary,
      orders: filteredOrders
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch order report" });
  }
});

// --- Error Handlers ---
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
});

// --- Start ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});
