module.exports = {
  getTest(req, res) {
    try {
      res.json({
        msg: "Successful GET request to test endpoint",
        params: req.query,
      });
    } catch (err) {
      res.status(err.status).json({ msg: "Something went wrong", err });
    }
  },
  postTest(req, res) {
    try {
      res.json({
        msg: "Successful POST request to test endpoint",
        body: req.body,
      });
    } catch (err) {
      res.status(err.status).json({ msg: "Something went wrong", err });
    }
  },
};
