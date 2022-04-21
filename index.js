import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors";
dotenv.config()
/** Routes */
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);
app.use("/deals", postRoutes);
app.use("/users", userRoutes);

app.get("/", (req,res) => {
    res.send("Memory API")
})


mongoose
  .connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(process.env.PORT || 8000, () => console.log(`Server running on port ${process.env.PORT}`))
  )
  .catch((error) => console.log(error.message));
