
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "77.37.35.20",
  user: "u901234396_procurement",
  password: "1A2b3u4bakar>?<",
  database: "u901234396_procurement",
});

// ✅ export db as default so you can import db from "..."
export default db;

// Optional: keep a connection test function
export async function testConnection() {
  try {
    const connection = await db.getConnection();
    console.log("✅ Connected to the MySQL database via XAMPP!");
    connection.release();
  } catch (error) {
    console.error("DB Insert Error:", error);
    console.error("❌ Error connecting to the database:", error.message);
  }
}

// Run test only if this file is executed directly (node db.js)
if (import.meta.url === `file://${process.argv[1]}`) {
  testConnection();
}
