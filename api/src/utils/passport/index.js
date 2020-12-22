import passport from "passport";
import LocalStrategy from "./localStrategy";

import { User } from "../../resources/user/user.model";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(LocalStrategy);

export default passport;
