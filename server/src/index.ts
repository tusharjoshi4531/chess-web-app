import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { challengeRouter } from "./routes/challengeRoutes";
import { authenticateToken } from "./middleware/authentication";
import { Server } from "socket.io";
import { createServer } from "http";
import { Challenge, ChallengeData } from "./global/types";

const app = express();

// Express
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

// Socket io
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

const userIdToSocketId = new Map<string, string>();
const socketIdToUserId = new Map<string, string>();
const userIdToUserName = new Map<string, string>();
const rooms = new Map<
    string,
    {
        white: string;
        black: string;
        black_time: { minuites: number; seconds: number };
        white_time: { minuites: number; seconds: number };
    }
>();

const disconnectUser = (socketId: string) => {
    const userId = socketIdToUserId.get(socketId);

    socketIdToUserId.delete(socketId);
    if (userId) {
        userIdToUserName.delete(userId);
        userIdToSocketId.delete(userId);
    }
};

const connectUser = (socketId: string, userId: string, username: string) => {
    userIdToSocketId.set(userId, socketId);
    socketIdToUserId.set(socketId, userId);
    userIdToUserName.set(userId, username);
};

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("connect-user", (data: { username: string; id: string }) => {
        connectUser(socket.id, data.id, data.username);
    });

    socket.on("accept-challenge", (data: ChallengeData, callback) => {
        console.log(data);
        if (userIdToSocketId.has(data.id)) {

            const roomId = data.challengeId;
            socket.join(roomId);

            socket.to(userIdToSocketId.get(data.id)!).emit("challenge-accepted", roomId);

            callback(true);
        } else {
            callback(false);
        }
    });

    socket.on("challenge-accepted-repy", (roomId) => {
        socket.join(roomId);

        console.log(socket.rooms);
    })

    socket.on("disconnect-user", () => {
        disconnectUser(socket.id);
    });

    socket.on("disconnect", () => {
        disconnectUser(socket.id);
    });
});

httpServer.listen(8080, () => {
    console.log("Listening at 8080");
});
