// const express = require("express");
import express from "express";
// const cookieParser = require("cookie-parser");
import cookieParser from "cookie-parser";
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");

const { createDBConnection } = require("./db");

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

const initializeApp = async () => {
  try {
    await createDBConnection();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀   Server running on PORT ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

initializeApp();
