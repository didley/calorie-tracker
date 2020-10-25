require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", require("./router"));

app.listen(PORT, () => {
  console.log(`🚀   Server running on PORT ${PORT}`);
});
