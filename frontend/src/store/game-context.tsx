import { createContext } from "react";
import { initialBoardState } from "../global/InitialBoardState";
import {
    BoardData
} from "../global/types";
import { useBoard } from "../hooks/board-hook"


type GameProviderProps = {
    children: React.ReactNode;
};

export const GameContext = createContext<BoardData>({
    moveNumber: 0,
    boardState: [...initialBoardState],
    isOnCurrentMove: () => true,
    setMoveNumber: () => {},
    addMove: () => {},
    onChoseSquare: () => {},
    changeMove: () => {},
    goToFirstMove: () => {},
    goToLastMove: () => {},
});

export const GameProvider = ({ children }: GameProviderProps) => {
    
    const values = useBoard()

    return (
        <GameContext.Provider value={values}>{children}</GameContext.Provider>
    );
};
