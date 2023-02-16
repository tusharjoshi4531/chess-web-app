import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { userRouter } from "./routes/userRoutes";
import { challengeRouter } from "./routes/challengeRoutes";
import { authenticateToken } from "./middleware/authentication";
import { Server, Socket } from "socket.io";
import { createServer } from "http";
import { ChallengeSocketData, MoveMadeData } from "./global/types";

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

const connectUser = (
    socket: Socket,
    userId: string,
    username: string
): boolean => {
    if (userIdToSocket.has(userId)) {
        return false;
    }

    userIdToSocket.set(userId, socket);
    socketIdToUserId.set(socket.id, userId);
    userIdToUsername.set(userId, username);
    usernameToUserId.set(username, userId);

    userIdToSocket.forEach((value, key) => {
        console.log(key);
    });
    console.log(socketIdToUserId);
    console.log(userIdToUsername);
    console.log(usernameToUserId);

    return true;
};

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);

    socket.on(
        "connect-user",
        (data: { username: string; id: string }, callback) => {
            if (!connectUser(socket, data.id, data.username)) {
                callback(false);
            } else {
                callback(true);
            }
        }
    );

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
            !usernameToUserId.has(data.black) ||
            !usernameToUserId.has(data.white)
        ) {
            callback("Users not online");
            return;
        }

        const blackId = usernameToUserId.get(data.black);
        const whiteId = usernameToUserId.get(data.white);

        if (!userIdToSocket.has(blackId!) || !userIdToSocket.has(whiteId!)) {
            callback("Socket object not found");
            return;
        }

        const blackSocket = userIdToSocket.get(blackId!)!;
        const whiteSocket = userIdToSocket.get(whiteId!)!;

        const roomName = `${whiteId}&${blackId}`;

        rooms.set(roomName, {
            white: whiteSocket.id,
            black: blackSocket.id,
        });

        whiteSocket
            .to(blackSocket.id)
            .emit("challenge-created", { roomName, data });
        blackSocket
            .to(whiteSocket.id)
            .emit("challenge-created", { roomName, data });

        console.log(rooms);
    });

    socket.on("move-made", (data: MoveMadeData, callback) => {
        if (!rooms.has(data.room)) {
            callback(false);
            return;
        }

        const targetId = rooms.get(data.room)![
            data.color === "white" ? "black" : "white"
        ];

        console.log(`move made in room ${data.room} to ${targetId}`);

        socket.to(targetId).emit("move-made", {
            moves: data.moves,
            displayMoves: data.displayMoves,
        });
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
        console.log(`${socket.id} has disconnected`);
        disconnectUser(socket.id);
    });
});

httpServer.listen(8080, () => {
    console.log("Listening at 8080");
});
