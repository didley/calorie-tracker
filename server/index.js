const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./db/connectDB");

const session = require("express-session");
const { ExpressOIDC } = require("@okta/oidc-middleware");

const app = express();
app.use(bodyParser.json());
const port = process.env.PORT || 5000;
connectDB();
app.use(express.static("public")); // TODO: remove after login tests

app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);

const oidc = new ExpressOIDC({
  appBaseUrl: `http://localhost:${port}`,
  issuer: process.env.OKTA_ORG_URL,
  client_id: process.env.OKTA_CLIENT_ID,
  client_secret: process.env.OKTA_CLIENT_SECRET,
  redirect_uri: "http://localhost:5000/authorization-code/callback",
  scope: "openid profile",
});

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);

app.use("/api/diary", require("./routes/api/diary"));
app.use("/api/foods", require("./routes/api/foods"));

app.listen(port, () => {
  console.log(`🚀   Server running on port ${port}`);
});
