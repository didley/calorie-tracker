import mongoose from "mongoose";
const dbName = "calorie-tracker";

import { dbURI } from "../utils/getDbURI";

const connect = async () => {
  await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    autoIndex: false,
    dbName: dbName,
  });
  console.log("🚀   Connected to DB successfully!");
};

const disconnect = () => mongoose.disconnect();

export default { connect, disconnect, name: dbName };
