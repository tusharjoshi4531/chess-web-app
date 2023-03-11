import express from "express";
import mongoose from "mongoose";
import authenticationRouter from "./routes/authentication";

const app = express();

app.use(express.json());

app.use("/auth", authenticationRouter);

mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGODB_API_KEY!)
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch((error) => {
        console.log(error);
    });

export default app;
