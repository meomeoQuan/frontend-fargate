const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

const BACKEND_URL = process.env.BACKEND_URL;

app.use("/api", async (req, res) => {
  try {
    const r = await axios({
      method: req.method,
      url: BACKEND_URL + req.originalUrl,
      data: req.body,
      headers: { "Content-Type": "application/json" }
    });
    res.status(r.status).json(r.data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => console.log("BFF running"));
