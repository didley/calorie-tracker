const express = require("express");
const connectDB = require("./db/connectDB");

const app = express();
const port = process.env.PORT || 5000;
connectDB();

app.use("/api/diary", require("./routes/api/diary"));

app.listen(port, () => {
  console.log(`🚀   Server running on port ${port}`);
});
