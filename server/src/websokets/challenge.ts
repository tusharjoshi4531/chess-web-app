import { Server } from "socket.io";
import {
    getSocketIdFromUsername,
    getUserIdFromUsername,
    getUsernameFromEmail,
    rooms,
} from "./global";
import { IChallengeData, IGameData, IGameState } from "./types";

export const sendChallenge = (data: IChallengeData, io: Server): boolean => {
    if (data.to.includes("@")) data.to = getUsernameFromEmail(data.to);
    if (data.white.includes("@")) data.white = getUsernameFromEmail(data.white);
    if (data.black.includes("@")) data.black = getUsernameFromEmail(data.black);

    const targetSocketId = getSocketIdFromUsername(data.to);

    if (targetSocketId == "") return false;

    console.log({ targetSocketId });
    io.to(targetSocketId).emit("challenge-receive", data);

    return true;
};

export const createChallenge = (data: IGameData, io: Server) => {
    const whiteUserId = getUserIdFromUsername(data.white);
    const blackUserId = getUserIdFromUsername(data.black);

    const roomId = `${whiteUserId}${blackUserId}`;

    rooms.set(roomId, data);

    const whiteSocketId = getSocketIdFromUsername(data.white);
    const blackSocketId = getSocketIdFromUsername(data.black);

    const whiteGameState: IGameState = {
        oponent: data.black,
        color: 0,
        boardState: data.boardState,
        roomId,
    };

    const blackGameState: IGameState = {
        oponent: data.white,
        color: 1,
        boardState: data.boardState,
        roomId,
    };

    io.to(whiteSocketId).emit("challenge-created", whiteGameState);
    io.to(blackSocketId).emit("challenge-created", blackGameState);
};
