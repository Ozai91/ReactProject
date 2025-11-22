import { pool } from "./db.js";

async function testConnection() {
  try {
    console.log("Testing database connection...");
    const [rows] = await pool.query("SELECT 1 as test");
    console.log("✅ Database connection successful!");
    console.log("Test query result:", rows);
    
    // Test if tables exist
    const [tables] = await pool.query("SHOW TABLES");
    console.log("\n📋 Available tables:");
    tables.forEach(table => console.log("-", Object.values(table)[0]));
    
    // Test mac table
    const [macProducts] = await pool.query("SELECT COUNT(*) as count FROM mac");
    console.log(`\n📦 Mac products count: ${macProducts[0].count}`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Database connection failed:");
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
    console.error("\nPlease make sure:");
    console.error("1. MySQL/MariaDB is running in Laragon");
    console.error("2. Database 'phonestore' exists");
    console.error("3. Tables mac, iphone, ipad, purchase_history exist");
    process.exit(1);
  }
}

testConnection();
