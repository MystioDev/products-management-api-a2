const express = require("express");
const { eq } = require("drizzle-orm");

const db = require("../db/db");
const { users } = require("../db/schema");

const router = express.Router();

// GET: Fetch all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await db.select().from(users);
    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// GET: Fetch a single user by ID
router.get("/:id", async (req, res) => {
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.params.id));

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// POST: Create a new user
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    await db.insert(users).values({
      name,
      email,
    });

    return res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// PUT: Update an existing user
router.put("/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.params.id));

    if (!existing) {
      return res.status(404).json({ error: "User not found" });
    }

    await db
      .update(users)
      .set({ name, email })
      .where(eq(users.id, req.params.id));

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE: Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.id, req.params.id));

    if (!existing) {
      return res.status(404).json({ error: "User not found" });
    }

    await db.delete(users).where(eq(users.id, req.params.id));

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
