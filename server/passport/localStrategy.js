const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const strategy = new LocalStrategy(
  { usernameField: "email" },
  (email, password, done) => {
    User.findOne({ email }, async (err, userMatch) => {
      if (err) {
        return done(err);
      }

      if (!userMatch) {
        return done(null, false, { message: "Account not found" });
      }

      const passwordMatch = await userMatch.checkPassword(password);
      if (!passwordMatch) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, userMatch);
    });
  }
);

module.exports = strategy;
