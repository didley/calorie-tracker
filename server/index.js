const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connectDB");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
connectDB();

app.use("/api/diary", require("./routes/api/diary"));
app.use("/api/foods", require("./routes/api/foods"));

app.listen(port, () => {
  console.log(`🚀   Server running on port ${port}`);
});
