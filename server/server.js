require("dotenv").config();
require("./db").connectDB();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.APP_SECRET,
    store: new MongoStore({ url: process.env.DB_URI }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./router"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀   Server running on PORT ${PORT}`);
});
