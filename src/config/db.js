
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ACHIEVE_METER_DATABASE",
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
