import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { challengeRouter } from "./routes/challengeRoutes";
import { authenticateToken } from "./middleware/authentication";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { Challenge, ChallengeData, ChallengeSocketData } from "./global/types";

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

const socketIdToUserId = new Map<string, string>();
const userIdToUsername = new Map<string, string>();
const usernameToUserId = new Map<string, string>();

const userIdToSocket = new Map<string, Socket>();

const rooms = new Map<
    string,
    {
        white: string;
        black: string;
    }
>();

const disconnectUser = (socketId: string) => {
    const userId = socketIdToUserId.get(socketId);

    socketIdToUserId.delete(socketId);

    if (!userId) return;

    userIdToUsername.delete(userId);
    userIdToSocket.delete(userId);

    const username = userIdToUsername.get(userId);
    if (!username) return;

    usernameToUserId.delete(username);
};

const connectUser = (socket: Socket, userId: string, username: string) => {
    userIdToSocket.set(userId, socket);
    socketIdToUserId.set(socket.id, userId);
    userIdToUsername.set(userId, username);
    usernameToUserId.set(username, userId);

    console.log(userIdToSocket);
    console.log(socketIdToUserId);
    console.log(userIdToUsername);
    console.log(usernameToUserId);
};

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on("connect-user", (data: { username: string; id: string }) => {
        connectUser(socket, data.id, data.username);
    });

    socket.on("challenge", (data: ChallengeSocketData, callback) => {
        if (
            !usernameToUserId.has(data.challengee) ||
            !usernameToUserId.has(data.challenger)
        ) {
            callback("Could not send challenge");
            return;
        }

        const challengeeId = usernameToUserId.get(data.challengee);

        if (!userIdToSocket.has(challengeeId!)) {
            callback("Cannot find socket object");
            return;
        }

        const challengeeSocketId = userIdToSocket.get(challengeeId!)!.id;

        socket.to(challengeeSocketId!).emit("challenge", data);

        callback("Challenge Sent");
    });

    socket.on("challenge-accepted", (data: ChallengeSocketData, callback) => {
        console.log(data.challenger, data.challengee);
        if (
            !usernameToUserId.has(data.challenger) ||
            !usernameToUserId.has(data.challengee)
        ) {
            callback("Users not online");
            return;
        }

        const challengerId = usernameToUserId.get(data.challenger);
        const challengeeId = usernameToUserId.get(data.challengee);

        if (
            !userIdToSocket.has(challengeeId!) ||
            !userIdToSocket.has(challengerId!)
        ) {
            callback("Socket object not found");
            return;
        }

        const challengerSocket = userIdToSocket.get(challengerId!)!;
        const challengeeSocket = userIdToSocket.get(challengeeId!)!;

        const roomName = `${challengerId}&${challengeeId}`;

        rooms.set(roomName, {
            white: challengerSocket.id,
            black: challengeeSocket.id,
        });

        challengeeSocket
            .to(challengerSocket.id)
            .emit("challenge-created", { roomName, data });
        challengerSocket
            .to(challengeeSocket.id)
            .emit("challenge-created", { roomName, data });

        console.log(rooms);
    });

    // socket.on("accept-challenge", (data: ChallengeData, callback) => {
    //     console.log(data);
    //     if (userIdToSocketId.has(data.id)) {

    //         const roomId = data.challengeId;
    //         socket.join(roomId);

    //         socket.to(userIdToSocketId.get(data.id)!).emit("challenge-accepted", roomId);

    //         callback(true);
    //     } else {
    //         callback(false);
    //     }
    // });

    // socket.on("challenge-accepted-repy", (roomId) => {
    //     socket.join(roomId);

    //     console.log(socket.rooms);
    // })

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
