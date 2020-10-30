require("dotenv").config();
require("./db").connectDB();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    genid: (req) => {
      console.log("in the session middleware");
      console.log(req.sessionID);
      return uuidv4();
    },
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.static(path.join(__dirname, "/client/build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.get("/test", (req, res) => {
  console.log("inside the test callback fn");
  console.log(req.sessionID);
  res.send("You hit /test route");
});

app.use("/api", require("./router"));

app.listen(PORT, () => {
  console.log(`🚀   Server running on PORT ${PORT}`);
});
