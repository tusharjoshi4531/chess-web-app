import { debug } from "console";
import { useContext } from "react";
import GameBoard from "../game/GameBoard";
import GameContext from "../../store/game/game-context";
import { GAME_STATE_ACTION_TYPE } from "../../store/game/types";
import UserContext from "../../store/user/user-context";

import styles from "./GameController.module.css";

const GameController = () => {
    const { game, gameData, dispatch } = useContext(GameContext);
    const { socket, username } = useContext(UserContext);

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
    };

    const resignClickHandler = () => {
        console.log(gameData.color ^ 1);
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
