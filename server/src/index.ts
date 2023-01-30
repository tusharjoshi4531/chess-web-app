import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { challengeRouter } from "./routes/challengeRoutes";
import { authenticateToken } from "./middleware/authentication";
import { Server } from "socket.io";
import { createServer } from "http";

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST"],
    })
);
app.use(express.json());

app.use("/users", userRouter);
app.use("/challenges", authenticateToken, challengeRouter);

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

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

httpServer.listen(8080, () => {
    console.log("Listening at 8080");
});
