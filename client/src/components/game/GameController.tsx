import React, { useContext, useState } from "react";
import GameBoard from "../game/GameBoard";
import GameContext from "../../store/game/game-context";
import {
    GameFinishStatus,
    GAME_STATE_ACTION_TYPE,
} from "../../store/game/types";
import UserContext from "../../store/user/user-context";

import styles from "./GameController.module.css";

const GameController = () => {
    const { game, gameData, dispatch } = useContext(GameContext);
    const { socket } = useContext(UserContext);

    const getGameFinishStatus = (): GameFinishStatus | undefined => {
        if (game.isCheckmate()) return "checkmate";
        if (game.isStalemate()) return "stalemate";
        if (game.isInsufficientMaterial()) return "insuffecient material";
        if (game.isThreefoldRepetition()) return "threefolds";
    };

    const moveMadeHandler = (newBoardState: string) => {
        if (!socket.obj || !gameData) return;

        console.log(newBoardState);

        dispatch({
            type: GAME_STATE_ACTION_TYPE.UPDATE_BOARD,
            payload: newBoardState,
        });

        socket.obj.emit("move-made", {
            roomId: gameData.roomId,
            boardState: newBoardState,
        });

        const gameFinishStatus = getGameFinishStatus();
        if (gameFinishStatus)
            socket.obj.emit("game-finish", {
                winner: gameFinishStatus === "checkmate" ? gameData.color : 2,
                type: gameFinishStatus,
                roomId: gameData.roomId,
            });
    };

    const resignClickHandler = () => {
        socket.obj.emit("game-finish", {
            winner: gameData.color ^ 1,
            type: "resign",
            roomId: gameData.roomId,
        });
    };

    return (
        <div className={styles.gameContainer}>
            <GameBoard
                size={600}
                game={game}
                onMoveMade={moveMadeHandler}
                color={gameData.color}
                pos={gameData.boardState}
            />
            <button onClick={resignClickHandler}>Resign</button>
        </div>
    );
};

export default GameController;
