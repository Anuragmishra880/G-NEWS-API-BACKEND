import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST"]
}));

app.get("/news", async (req, res) => {
  try {
    const { q, lang } = req.query;

    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${q}&lang=${lang}&max=20&apikey=${process.env.API_KEY}`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching news" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});