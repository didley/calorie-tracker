const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const strategy = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    User.findOne({ email }, (err, userMatch) => {
      if (err) {
        return done(err);
      }
      if (!userMatch) {
        return done(null, false, { message: "Account not found" });
      }
      if (!userMatch.checkPassword(password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, userMatch);
    });
  }
);

module.exports = strategy;
