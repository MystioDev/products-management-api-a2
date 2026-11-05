const express = require("express");

const db = require("../db/db");
const { products } = require("../db/schema");
const { eq } = require("drizzle-orm");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const entries = await db.select().from(products);

    return res.status(200).json(entries);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error.",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const [entry] = await db
      .select()
      .from(products)
      .where(eq(products.id, +req.params.id));

    if (!entry) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    return res.status(200).json(entry);
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error.",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, inStock } = req.body;

    if (!name) {
      return res.status(404).json({
        message: "The 'name' field is required!",
      });
    }

    if (!price) {
      return res.status(404).json({
        message: "The 'price' field is required!",
      });
    }

    if (inStock === undefined) {
      return res.status(404).json({
        message: "The 'inStock' field is required!",
      });
    }

    await db.insert(products).values({
      name,
      price,
      inStock,
    });

    return res.status(201).json({
      message: "Product created successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error.",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [entry] = await db
      .select()
      .from(products)
      .where(eq(products.id, +req.params.id));

    if (!entry) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    const { name, price, inStock } = req.body;

    await db
      .update(products)
      .set({
        name,
        price,
        inStock,
      })
      .where(eq(products.id, +req.params.id));

    return res.status(200).json({
      message: "Product updated successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Internal server error.",
    });
  }
});

module.exports = router;
