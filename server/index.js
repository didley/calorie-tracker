import express from "express";
import connectDB from "./db/mongoose.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`🚀   Server running on http://localhost:${port}`);
});
