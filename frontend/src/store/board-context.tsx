import { createContext, useState } from "react";
import { initialBoardState } from "../global/InitialBoardState";
import {
    BLACK,
    BoardState,
    Color,
    Move,
    Square,
    WHITE,
    B_B,
    B_K,
    B_N,
    B_P,
    B_Q,
    B_R,
    W_B,
    W_K,
    W_N,
    W_P,
    W_Q,
    W_R,
    BoardChange,
} from "../global/types";
import { moveBack, moveForward } from "../helper/change-move";
import {
    getColor,
    checkPawn,
    checkBishop,
    checkKing,
    checkKnight,
    checkQueen,
    checkRook,
} from "../helper/check-piece";

import { updateBoard } from "../helper/update-board";

type BoardContextData = {
    moveNumber: number;
    boardState: BoardState;
    isOnCurrentMove: () => boolean;
    setMoveNumber: React.Dispatch<React.SetStateAction<number>>;
    onChoseSquare: (
        file: number,
        rank: number,
        onMoveFinish?: (
            move: Move,
            prevSquare?: Square | undefined,
            currentSquare?: Square | undefined
        ) => void
    ) => void;
    addMove: (move: Move) => void;
    changeMove: (targetMoveNumber: number) => void;
    goToFirstMove: () => void;
    goToLastMove: () => void;
};

type BoardProviderProps = {
    children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextData>({
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

export const BoardProvider = ({ children }: BoardProviderProps) => {
    const [boardState, setBoardState] = useState<BoardState>([...initialBoardState]);
    const [chosenSquare, setChosenSquare] = useState<Square | null>(null);
    const [enPassentSquare, setEnPassentSquare] = useState<Square | null>(null);
    const [turn, setTurn] = useState<Color>(0);
    const [moveNumber, setMoveNumber] = useState<number>(0);
    const [moves, setMoves] = useState<Move[]>([]);

    const isOnCurrentMove = () => moves.length === moveNumber;

    const addMove = (move: Move) => {
        setMoves((state) => [...state, move]);
        setMoveNumber((state) => state + 1);
    };

    const changeMove = (targetMoveNumber: number) => {
        if (targetMoveNumber > moves.length || targetMoveNumber < 0) return;

        setBoardState((state) => {
            if (targetMoveNumber < moveNumber) {
                return moveBack(targetMoveNumber, moveNumber, state, moves);
            } else {
                return moveForward(targetMoveNumber, moveNumber, state, moves);
            }
        });
        setMoveNumber(targetMoveNumber);
    };

    const goToFirstMove = () => {
        changeMove(0);
    };

    const goToLastMove = () => {
        changeMove(moves.length);
    };

    const movePiece = (
        file: number,
        rank: number,
        onMoveFinish: (
            move: Move,
            prevSquare?: Square | undefined,
            currentSquare?: Square | undefined
        ) => void
    ) => {
        if (chosenSquare === null) return null;

        const changes: BoardChange[] = [];

        if (getColor(boardState[rank][file]) === turn) {
            setChosenSquare(null);
            return null;
        } else if (
            (boardState[chosenSquare.rank][chosenSquare.file] === W_P ||
                boardState[chosenSquare.rank][chosenSquare.file] === B_P) &&
            checkPawn(
                boardState,
                turn,
                { file, rank },
                chosenSquare,
                enPassentSquare
            )
        ) {
            setBoardState((state) =>
                updateBoard(
                    { file, rank },
                    chosenSquare,
                    state,
                    changes,
                    () => {
                        if (
                            enPassentSquare !== null &&
                            enPassentSquare.file === file &&
                            enPassentSquare.rank === rank
                        ) {
                            changes.push([
                                chosenSquare.rank * 10 + file,
                                state[chosenSquare.rank][file],
                                null,
                            ]);
                            state[chosenSquare.rank][file] = null;
                        }

                        if (Math.abs(rank - chosenSquare.rank) === 2) {
                            setEnPassentSquare({
                                file,
                                rank: rank - (rank - chosenSquare.rank) / 2,
                            });
                        } else {
                            setEnPassentSquare(null);
                        }
                        onMoveFinish(changes, chosenSquare, { file, rank });
                        setTurn((turn) => (turn === WHITE ? BLACK : WHITE));
                        setChosenSquare(null);
                    }
                )
            );
        } else {
            const isValidMove =
                ((boardState[chosenSquare.rank][chosenSquare.file] === W_B ||
                    boardState[chosenSquare.rank][chosenSquare.file] === B_B) &&
                    checkBishop(boardState, { file, rank }, chosenSquare)) ||
                ((boardState[chosenSquare.rank][chosenSquare.file] === W_N ||
                    boardState[chosenSquare.rank][chosenSquare.file] === B_N) &&
                    checkKnight({ file, rank }, chosenSquare)) ||
                ((boardState[chosenSquare.rank][chosenSquare.file] === W_R ||
                    boardState[chosenSquare.rank][chosenSquare.file] === B_R) &&
                    checkRook(boardState, { file, rank }, chosenSquare)) ||
                ((boardState[chosenSquare.rank][chosenSquare.file] === W_Q ||
                    boardState[chosenSquare.rank][chosenSquare.file] === B_Q) &&
                    checkQueen(boardState, { file, rank }, chosenSquare)) ||
                ((boardState[chosenSquare.rank][chosenSquare.file] === W_K ||
                    boardState[chosenSquare.rank][chosenSquare.file] === B_K) &&
                    checkKing(boardState, { file, rank }, chosenSquare));

            if (isValidMove) {
                setBoardState((state) =>
                    updateBoard(
                        { file, rank },
                        chosenSquare,
                        state,
                        changes,
                        () => {
                            onMoveFinish(changes, chosenSquare, { file, rank });
                            setTurn((turn) => (turn === WHITE ? BLACK : WHITE));
                            setChosenSquare(null);
                        }
                    )
                );
            } else {
                setChosenSquare(null);
            }
        }
    };

    const onChoseSquare = (
        file: number,
        rank: number,
        onMoveFinish: (changes: BoardChange[]) => void = () => {}
    ) => {
        if (file === chosenSquare?.file && rank === chosenSquare.rank) {
            return;
        }

        if (chosenSquare === null) {
            if (
                (turn === WHITE &&
                    getColor(boardState[rank][file]) === WHITE) ||
                (turn === BLACK && getColor(boardState[rank][file]) === BLACK)
            ) {
                setChosenSquare({ file, rank });
            }
        } else {
            movePiece(file, rank, onMoveFinish);
        }
    };

    const values: BoardContextData = {
        moveNumber,
        boardState,
        isOnCurrentMove,
        setMoveNumber,
        onChoseSquare,
        addMove,
        changeMove,
        goToFirstMove,
        goToLastMove,
    };

    return (
        <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
    );
};
