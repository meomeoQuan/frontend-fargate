const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000;

// real backend (ASP.NET)
const BACKEND_URL =
  process.env.BACKEND_URL || "http://backend.discovery.local:8080";

app.use(cors());
app.use(express.json());

// GET all products
app.get("/api/products", async (req, res) => {
  try {
    const r = await axios.get(`${BACKEND_URL}/api/products`);
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// CREATE
app.post("/api/products", async (req, res) => {
  try {
    const r = await axios.post(`${BACKEND_URL}/api/products`, req.body);
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// UPDATE
app.put("/api/products/:id", async (req, res) => {
  try {
    const r = await axios.put(
      `${BACKEND_URL}/api/products/${req.params.id}`,
      req.body
    );
    res.json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// DELETE
app.delete("/api/products/:id", async (req, res) => {
  try {
    await axios.delete(
      `${BACKEND_URL}/api/products/${req.params.id}`
    );
    res.sendStatus(204);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`Node BFF running at http://localhost:${port}`);
});
