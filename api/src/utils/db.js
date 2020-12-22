import mongoose from "mongoose";

export const connect = () => {
  mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
  });
  console.log("🚀   Connected to DB successfully!");
};
