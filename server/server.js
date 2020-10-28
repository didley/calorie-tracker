require("dotenv").config();
require("./db").connectDB();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { auth, requiresAuth } = require("express-openid-connect");
const session = require("express-session");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cookieParser());

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       secure: process.env.NODE_ENV === "production",
//       httpOnly: true,
//     },
//   })
// );

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.APP_SECRET,
  baseURL: "http://localhost:5000",
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));
app.use(bodyParser.json());

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.use("/api", require("./router"));

app.listen(PORT, () => {
  console.log(`🚀   Server running on PORT ${PORT}`);
});
