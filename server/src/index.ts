import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
dotenv.config();

import app from "./app";
import { createChallenge, sendChallenge } from "./websokets/challenge";
import { connect, debug, disconnect } from "./websokets/connection";
import { IChallengeData, IGameData } from "./websokets/types";

const PORT = process.env.PORT || 3000;

const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    console.log(PORT);
});

// Socket io
const io = new Server(httpServer, {
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    console.log(`${socket.id} connected`);
    socket.join(socket.id);

    // Connect user to socket
    socket.on("connect-user", (data, callback) => {
        console.log(data);
        const hasConnected = connect(
            socket.id,
            data.userId,
            data.username,
            data.email
        );

        if (callback) callback(hasConnected);
        debug();
    });

    // When a player makes a challenge
    socket.on("challenge-sent", (data: IChallengeData, callback) => {
        // console.log(data);
        callback(sendChallenge(data, io));
        // console.log(data);
    });

    // Whem player accepts challenge
    socket.on("challenge-accepted", (data: IGameData) => {
        createChallenge(data, io);
    });

    // Disconnect user
    socket.on("disconnect", () => {
        console.log(`${socket.id} disconnected`);
        disconnect(socket.id);
        debug();
    });
});
