import { createContext, useState } from "react";
import {
    UseBoardData,
    BoardState,
    Move,
    W_B,
    W_K,
    W_N,
    W_P,
    W_Q,
    W_R,
    B_B,
    B_K,
    B_N,
    B_P,
    B_Q,
    B_R,
} from "../global/types";
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
    analysisMethods: UseBoardData;
    gameMethods: UseBoardData;
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
    analysisMethods: {} as UseBoardData,
    gameMethods: {} as UseBoardData,
});

export const GameProvider = ({ children }: GameProviderProps) => {
    const [analysisBoardState, setAnalysisBoardState] = useState<BoardState>([
        [W_R, W_N, W_B, W_Q, W_K, W_B, W_N, W_R],
        [W_P, W_P, W_P, W_P, W_P, W_P, W_P, W_P],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [B_P, B_P, B_P, B_P, B_P, B_P, B_P, B_P],
        [B_R, B_N, B_B, B_Q, B_K, B_B, B_N, B_R],
    ]);
    const [gameBoardState, setGameBoardState] = useState<BoardState>([
        [W_R, W_N, W_B, W_Q, W_K, W_B, W_N, W_R],
        [W_P, W_P, W_P, W_P, W_P, W_P, W_P, W_P],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [B_P, B_P, B_P, B_P, B_P, B_P, B_P, B_P],
        [B_R, B_N, B_B, B_Q, B_K, B_B, B_N, B_R],
    ]);
    const [analysisMoves, setAnalysisMoves] = useState<Move[]>([]);
    const [gameMoves, setGameMoves] = useState<Move[]>([]);
    const [analysisDisplayMoves, setAnalysisDisplayMoves] = useState<string[]>(
        []
    );
    const [gameDisplayMoves, setGameDisplayMoves] = useState<string[]>([]);

    const analysisMethods = useBoard(
        analysisBoardState,
        setAnalysisBoardState,
        analysisMoves,
        setAnalysisMoves
    );
    const gameMethods = useBoard(
        gameBoardState,
        setGameBoardState,
        gameMoves,
        setGameMoves
    );

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
