# Express + Drizzle ORM + MySQL Starter Template

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express-5.x-blue.svg)](https://expressjs.com/)
[![Drizzle ORM](https://img.shields.io/badge/drizzle--orm-latest-C5F74F.svg)](https://orm.drizzle.team/)
[![MySQL](https://img.shields.io/badge/mysql-8.x-orange.svg)](https://www.mysql.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

A minimal, clean, and beginner-friendly REST API template built with **Express 5**, **Drizzle ORM**, and **MySQL**.

---

## ⚡ Quick Start: Use This Template

You can spin up your own backend API in seconds using this repository as a template.

### Option A: Using the GitHub UI (Recommended)

1. Click the green **[Use this template](https://github.com/new)** button at the top of this repository.
2. Select **"Create a new repository"**.
3. Choose an owner, name your new project (e.g. `my-awesome-api`), and click **Create repository**.
4. Clone **your new repository**:
   ```bash
   git clone https://github.com/<your-username>/<your-new-repo>.git
   cd <your-new-repo>
   ```

### Option B: Using GitHub CLI

```bash
# Create a new repo from this template and clone it locally
gh repo create my-awesome-api --template MystioDev/express-drizzle-mysql --clone
cd my-awesome-api
```

---

## 🛠️ Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer)
- A running [MySQL](https://www.mysql.com/) instance

> **Tip: Quick MySQL via Docker**
> ```bash
> docker run --name mysql-dev -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=express_drizzle_db -p 3306:3306 -d mysql:8
> ```

---

### Step-by-Step Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   Open `.env` and set your database connection URL:
   ```env
   PORT=3000
   DATABASE_URL="mysql://root:password@localhost:3306/express_drizzle_db"
   ```

3. **Push the database schema:**
   Sync the Drizzle schema directly to your MySQL database:
   ```bash
   npm run db:push
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Your server is live at [http://localhost:3000](http://localhost:3000)!

---

## 📁 Project Structure

```text
├── drizzle/                     # Drizzle Kit generated migrations & schema snapshots
├── src/
│   ├── db/
│   │   ├── db.js                # MySQL pool & Drizzle ORM client
│   │   └── schema.js            # Drizzle table schemas
│   ├── routes/
│   │   └── users.js             # User CRUD router
│   └── index.js                 # Server entry point & route mounting
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
├── drizzle.config.js            # Drizzle Kit configuration
├── package.json                 # Project dependencies & scripts
└── README.md                    # Project documentation
```

---

## 🎨 Customizing the Template for Your Project

When using this template for a new backend project, follow these simple steps to adapt it:

1. **Update `package.json`**:
   Change `"name"`, `"description"`, and `"author"` to match your project.

2. **Define Your Tables (`src/db/schema.js`)**:
   Add or replace tables using Drizzle ORM:
   ```javascript
   const { mysqlTable, int, varchar, timestamp } = require("drizzle-orm/mysql-core");

   const products = mysqlTable("products", {
     id: int("id").primaryKey().autoincrement(),
     title: varchar("title", { length: 255 }).notNull(),
     createdAt: timestamp("created_at").defaultNow(),
   });

   module.exports = { users, products };
   ```

3. **Create Your Routes (`src/routes/products.js`)**:
   ```javascript
   const express = require("express");
   const router = express.Router();
   const db = require("../db/db");
   const { products } = require("../db/schema");

   router.get("/", async (req, res) => {
     try {
       const allProducts = await db.select().from(products);
       res.status(200).json(allProducts);
     } catch (error) {
       res.status(500).json({ error: error.message });
     }
   });

   module.exports = router;
   ```

4. **Mount in `src/index.js`**:
   ```javascript
   const productsRouter = require("./routes/products");

   app.use("/api/products", productsRouter);
   ```

5. **Sync Your Changes**:
   ```bash
   npm run db:push
   ```

---

## 📜 Available Scripts

| Script | Command | Description |
| :--- | :--- | :--- |
| `npm run dev` | `nodemon src/index.js` | Starts the server with live reload |
| `npm start` | `node src/index.js` | Runs the server in production mode |
| `npm run db:push` | `drizzle-kit push` | Applies schema changes directly to MySQL |
| `npm run db:generate` | `drizzle-kit generate` | Generates SQL migrations from schema |
| `npm run db:studio` | `drizzle-kit studio` | Opens Drizzle Studio (web database browser) |
| `npm run db:check` | `drizzle-kit check` | Validates schema consistency |

---

## 📡 Included Example API (`/api/users`)

This template includes a ready-to-use CRUD example for **Users**:

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | List all users | None |
| `GET` | `/api/users/:id` | Get user by ID | None |
| `POST` | `/api/users` | Create a user | `{ "name": "Alice", "email": "alice@example.com" }` |
| `PUT` | `/api/users/:id` | Update a user by ID | `{ "name": "Alice Smith", "email": "alice@example.com" }` |
| `DELETE` | `/api/users/:id` | Delete a user by ID | None |

#### Sample Responses:

- **Create User (`POST /api/users`) $\rightarrow$ `201 Created`:**
  ```json
  {
    "message": "User created successfully"
  }
  ```

- **Get All Users (`GET /api/users`) $\rightarrow$ `200 OK`:**
  ```json
  [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@example.com"
    }
  ]
  ```

- **User Not Found (`GET /api/users/999`) $\rightarrow$ `404 Not Found`:**
  ```json
  {
    "error": "User not found"
  }
  ```

---

## 📄 License

[ISC](LICENSE)
