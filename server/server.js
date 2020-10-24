require("dotenv").config();
const express = require("express");
const connectDB = require("./db/connectDB");
const bodyParser = require("body-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/User");

// passport cofig

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    username,
    password,
    done
  ) {
    User.findOne({ email: username }, async function (err, user) {
      if (err) {
        return done(err);
      }
      try {
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Server start
const PORT = process.env.PORT || 5000;
const app = express();
connectDB();
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/diary", require("./routes/api/diary"));
app.use("/api/foods", require("./routes/api/foods"));
app.use("/api/login", require("./routes/api/login"));
app.use("/api/register", require("./routes/api/register"));

app.listen(PORT, () => {
  console.log(`🚀   Server running on PORT ${PORT}`);
});
