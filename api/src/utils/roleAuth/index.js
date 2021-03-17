import { User } from "../../resources/user/user.model";

/**
 * Role authorization middleware that checks if Users role is within supplied role array
 * @param {array} roles - pass array of roles eg. ["basic", "admin", "supervisor"]
 */
export const roleAuth = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    User.findById(user._id, (err, foundUser) => {
      if (err) {
        res.status(422).json({ msg: "User not found." });
        return next(err);
      }

      if (roles.includes(foundUser.role)) return next();

      res.status(401).json({ msg: "Access denied" });
    });
  };
};
