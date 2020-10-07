import express from "express";
import connectDB from "./db/mongoose.js";
import diaryRouter from "./routes/api/diary.js";

const app = express();
const port = process.env.PORT || 5000;
connectDB();

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

app.use("/api/diary", diaryRouter);

app.listen(port, () => {
  console.log(`🚀   Server running on port ${port}`);
});
