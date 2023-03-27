import { Chess } from "chess.js";
import { createContext } from "react";
import { IGameState } from "./types";

interface IGameContext {
    game: Chess;
    gameData?: IGameState;
}

const GameContext = createContext<IGameContext>({
    game: new Chess(),
    gameData: undefined,
});

export default GameContext;
