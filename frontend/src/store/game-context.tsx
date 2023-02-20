import { createContext, useState } from "react";
import { IUseBoardData, BoardState, Move, Square } from "../global/types";
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
    analysisChosenSquare: Square | null;
    analysisCheckSquare: Square | null;
    analysisCheckmateSquare: Square | null;
    gameChosenSquare: Square | null;
    gameCheckSquare: Square | null;
    gameCheckmateSquare: Square | null;
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
    analysisChosenSquare: null,
    analysisCheckSquare: null,
    analysisCheckmateSquare: null,
    gameChosenSquare: null,
    gameCheckSquare: null,
    gameCheckmateSquare: null,
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
        chosenSquare: analysisChosenSquare,
        checkSquare: analysisCheckSquare,
        checkmateSquare: analysisCheckmateSquare,
        boardState: analysisBoardState,
        setBoardState: setAnalysisBoardState,
        moves: analysisMoves,
        setMoves: setAnalysisMoves,
    } = analysisMethods;
    const {
        chosenSquare: gameChosenSquare,
        checkSquare: gameCheckSquare,
        checkmateSquare: gameCheckmateSquare,
        boardState: gameBoardState,
        setBoardState: setGameBoardState,
        moves: gameMoves,
        setMoves: setGameMoves,
    } = gameMethods;

    const values = {
        analysisChosenSquare,
        analysisCheckSquare,
        analysisCheckmateSquare,
        gameChosenSquare,
        gameCheckSquare,
        gameCheckmateSquare,
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
