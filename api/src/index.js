import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import connectMongo from "connect-mongo";
import passport from "passport";
import router from "./resources/router";
import { connect, disconnect } from "./utils/db";
import morgan from "morgan";
import helmet from "helmet";

const app = express();
const MongoStore = connectMongo(session);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(helmet());

app.use(
  session({
    secret: process.env.APP_SECRET,
    store: new MongoStore({ url: process.env.DB_URI }),
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

const initializeApp = async () => {
  try {
    await connect();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀   Server running on PORT ${PORT}`));
  } catch (err) {
    console.error(err);
  }
};

app.on("close", () => disconnect());

initializeApp();
