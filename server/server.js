require("dotenv").config();
require("./db").connectDB();
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const UserModel = require("./models/User");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const foundUser = await UserModel.findOne({ email });

        if (!foundUser) {
          return done(null, false, { message: "Incorrect email." });
        }

        const correctPassword = await bcrypt.compare(
          password,
          foundUser.password
        );
        if (!correctPassword) {
          return done(null, false, { message: "Incorrect password" });
        }

        return done(null, foundUser);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserModel.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

const app = express();
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.APP_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: process.env.DB_URI }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", require("./router"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀   Server running on PORT ${PORT}`);
});
