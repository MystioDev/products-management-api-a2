const { drizzle } = require("drizzle-orm/mysql2");
const mysql = require("mysql2/promise");
const schema = require("./schema");

if (!process.env.DATABASE_URL) {
  console.warn(
    "[WARN] DATABASE_URL is not defined in environment variables. Please check your .env file."
  );
}

const poolConnection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db = drizzle(poolConnection, { schema, mode: "default" });

module.exports = db;
