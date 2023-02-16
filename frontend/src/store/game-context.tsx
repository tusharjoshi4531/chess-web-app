import { createContext, useState } from "react";
import { IUseBoardData, BoardState, Move } from "../global/types";
import { useBoard } from "../hooks/board-hook";

type GameProviderProps = {
    children: React.ReactNode;
};

type GameContextData = {
    analysisBoardState: BoardState;
    gameBoardState: BoardState;
    analysisMoves: Move[];
    gameMoves: Move[];
    analysisDisplayMoves: string[];
    gameDisplayMoves: string[];
    setAnalysisBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
    setGameBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
    setAnalysisMoves: React.Dispatch<React.SetStateAction<Move[]>>;
    setGameMoves: React.Dispatch<React.SetStateAction<Move[]>>;
    setAnalysisDisplayMoves: React.Dispatch<React.SetStateAction<string[]>>;
    setGameDisplayMoves: React.Dispatch<React.SetStateAction<string[]>>;
    analysisMethods: IUseBoardData;
    gameMethods: IUseBoardData;
};

export const GameContext = createContext<GameContextData>({
    analysisBoardState: [],
    gameBoardState: [],
    analysisMoves: [],
    gameMoves: [],
    analysisDisplayMoves: [],
    gameDisplayMoves: [],
    setAnalysisBoardState: () => {},
    setGameBoardState: () => {},
    setAnalysisMoves: () => {},
    setGameMoves: () => {},
    setAnalysisDisplayMoves: () => {},
    setGameDisplayMoves: () => {},
    analysisMethods: {} as IUseBoardData,
    gameMethods: {} as IUseBoardData,
});

export const GameProvider = ({ children }: GameProviderProps) => {
    const [analysisDisplayMoves, setAnalysisDisplayMoves] = useState<string[]>(
        []
    );

    const [gameDisplayMoves, setGameDisplayMoves] = useState<string[]>([]);

    const analysisMethods = useBoard();
    const gameMethods = useBoard();

    const {
        boardState: analysisBoardState,
        setBoardState: setAnalysisBoardState,
        moves: analysisMoves,
        setMoves: setAnalysisMoves,
    } = analysisMethods;
    const {
        boardState: gameBoardState,
        setBoardState: setGameBoardState,
        moves: gameMoves,
        setMoves: setGameMoves,
    } = gameMethods;

    const values = {
        analysisBoardState,
        gameBoardState,
        analysisMoves,
        gameMoves,
        analysisDisplayMoves,
        gameDisplayMoves,
        setAnalysisBoardState,
        setGameBoardState,
        setAnalysisMoves,
        setGameMoves,
        setAnalysisDisplayMoves,
        setGameDisplayMoves,
        analysisMethods,
        gameMethods,
    };

    return (
        <GameContext.Provider value={values}>{children}</GameContext.Provider>
    );
};
