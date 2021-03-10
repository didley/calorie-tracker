import { User } from "../../resources/user/user.model";

export const roleAuth = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ msg: "User not found." });
        return next(err);
      }

      if (roles.contains(foundUser.role)) return next();

      res.status(401).json({ msg: "Access denied" });
      return next("Unauthorized");
    });
  };
};
