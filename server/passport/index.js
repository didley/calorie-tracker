const passport = require("passport");
const LocalStrategy = require("./localStrategy");
const User = require("../models/User");

passport.serializeUser((user, done) => {
  console.log({ user });
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(LocalStrategy);

module.exports = passport;
