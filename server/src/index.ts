import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
);
app.use(express.json());

app.use("/users", userRouter);

mongoose.set("strictQuery", false);
mongoose
    .connect(
        "mongodb+srv://tusharjoshi:krmkmemah@chessapp.ezsikdv.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("connected to mongoose");
    })
    .catch((error) => {
        console.log(error);
    });

app.listen(8080, () => {
    console.log("Listening at 8080");
});
