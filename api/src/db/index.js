const { connect } = require("mongoose");

module.exports = {
  async createDBConnection() {
    try {
      await connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        autoIndex: false,
      });
      console.log("🚀   Connected to DB successfully!");
    } catch (err) {
      console.log(err.message);
      process.exit(1); // Exit process on failure
    }
  },
};
