import { Server } from "socket.io";
import {
    getRoomFromUsername,
    getSocketIdFromUsername,
    getUserIdFromUsername,
    getUsernameFromEmail,
    rooms,
} from "./global";
import { IChallengeData, IGameData, IGameState, IMoveMade } from "./types";

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

export const getGameState = (
    username: string,
    roomId: string,
    data: IGameData
): IGameState | undefined => {
    const userSocketId = getSocketIdFromUsername(username);

    if (data.white == username)
        return {
            oponent: data.black,
            color: 0,
            boardState: data.boardState,
            roomId,
        };

    if (data.black == username)
        return {
            oponent: data.white,
            color: 1,
            boardState: data.boardState,
            roomId,
        };
};

export const createChallenge = (data: IGameData, io: Server) => {
    const whiteUserId = getUserIdFromUsername(data.white);
    const blackUserId = getUserIdFromUsername(data.black);

    const roomId = `${whiteUserId}${blackUserId}`;

    rooms.set(roomId, data);

    const whiteSocketId = getSocketIdFromUsername(data.white);
    const blackSocketId = getSocketIdFromUsername(data.black);

    const whiteGameState = getGameState(data.white, roomId, data);
    const blackGameState = getGameState(data.black, roomId, data);

    if (!whiteGameState || !blackGameState) return;

    io.to(whiteSocketId).emit("challenge-created", whiteGameState);
    io.to(blackSocketId).emit("challenge-created", blackGameState);
};

export const moveMade = (data: IMoveMade, io: Server): boolean => {
    if (!rooms.has(data.roomId)) return false;

    const gameData = rooms.get(data.roomId)!;
    const { white, black } = gameData;

    const whiteSocketId = getSocketIdFromUsername(white);
    const blackSocketId = getSocketIdFromUsername(black);

    if (whiteSocketId == "" || blackSocketId == "") return false;

    rooms.set(data.roomId, { ...gameData, boardState: data.boardState });

    io.to([whiteSocketId, blackSocketId]).emit("move-made", {
        boardState: data.boardState,
    });

    return true;
};

export const findGameStateWithUsername = (
    username: string
): IGameState | undefined => {
    const roomId = getRoomFromUsername(username);

    if (roomId == "") return undefined;

    const roomData = rooms.get(roomId)!;
    const gameState = getGameState(username, roomId, roomData);

    return gameState;
};
