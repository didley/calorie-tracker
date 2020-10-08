// const mongoose = require("mongoose");
const { connect } = require("mongoose");

module.exports = async function connectDB() {
  try {
    await connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🚀   Connected to DB successfully!");
  } catch (err) {
    console.log(err.message);
    process.exit(1); // Exit process on failure
  }
};
