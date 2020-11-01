module.exports = {
  getUserDetails: (req, res) => {
    console.log(req.user);
    if (req.user) {
      return res.json({ user: req.user });
    } else {
      return res.json({ user: null });
    }
  },
  loginUser: (req, res) => {
    console.log("POST to /login");
    const { password, ...cleanUser } = req.user._doc;
    return res.json({ user: cleanUser });
  },
  logoutUser: (req, res) => {},
  registerUser: (req, res) => {},
  // authenticate: (req, res) => {
  //   const cookieOptions = {
  //     httpOnly: true,
  //   };

  //   if (req.auth.user === "admin") {
  //     res.cookie("name", "admin", cookieOptions).send({ screen: "admin" });
  //   } else if (req.auth.user === "user") {
  //     res.cookie("name", "user", cookieOptions).send({ screen: "user" });
  //   }
  // },
  // readCookie: (req, res) => {
  //   if (req.cookies.name === "admin") {
  //     res.send({ screen: "admin" });
  //   } else if (req.cookies.name === "user") {
  //     res.send({ screen: "user" });
  //   } else {
  //     res.send({ screen: "auth" });
  //   }
  // },
  // clearCookie: (req, res) => {
  //   res.clearCookie("name").end();
  // },
};
