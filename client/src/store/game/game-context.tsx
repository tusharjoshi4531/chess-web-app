import { Chess } from "chess.js";
import { createContext } from "react";

import { IGameState, IGameStateReducerAction, initialGameState } from "./types";

interface IGameContext {
    game: Chess;
    gameData: IGameState;
    dispatch: React.Dispatch<IGameStateReducerAction>;
}

const GameContext = createContext<IGameContext>({
    game: new Chess(),
    gameData: {...initialGameState},
    dispatch: () => {},
});

export default GameContext;
