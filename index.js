import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import UserRouter from "./routers/userRouter.js";
import connectDB from "./database.js";
import LinkRouter from "./routers/linkRouter.js";

connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send({ message: "hello world!" });
});

app.use("/links", LinkRouter);

// כאן לא מחייב כיוון שה-Routes של ה-Users נמצאים כבר תחת '/users'
app.use("/users", UserRouter);

app.listen(3000, () => {
  console.log("app is running on http://localhost:3000");
});


