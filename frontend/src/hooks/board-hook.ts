import { useEffect, useState } from "react";
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
    IUseBoardData,
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
import {
    getKingSquare,
    getSquareStatus,
    isSquareInCheck,
} from "../helper/check-square-attacked";
import { updateBoard } from "../helper/update-board";

export type UseBoard = () => IUseBoardData;

export const useBoard: UseBoard = () => {
    const [boardState, setBoardState] = useState<BoardState>([
        [W_R, W_N, W_B, W_Q, W_K, W_B, W_N, W_R],
        [W_P, W_P, W_P, W_P, W_P, W_P, W_P, W_P],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [B_P, B_P, B_P, B_P, B_P, B_P, B_P, B_P],
        [B_R, B_N, B_B, B_Q, B_K, B_B, B_N, B_R],
    ]);
    const [moves, setMoves] = useState<Move[]>([]);
    const [moveNumber, setMoveNumber] = useState<number>(0);
    const [chosenSquare, setChosenSquare] = useState<Square | null>(null);
    const [checkSquare, setCheckSquare] = useState<Square | null>(null);
    const [checkmateSquare, setCheckmateSquare] = useState<Square | null>(null);
    const [enPassentSquare, setEnPassentSquare] = useState<Square | null>(null);
    const [turn, setTurn] = useState<Color>(0);

    useEffect(() => {
        const kingSquare = getKingSquare(boardState, turn);
        if (!kingSquare) return;

        const status = getSquareStatus(boardState, kingSquare, turn);

        switch (status) {
            case 1:
                setCheckSquare(kingSquare);
                break;
            case 2:
                setCheckSquare(kingSquare);
                setCheckmateSquare(kingSquare);
                break;
            default:
                setCheckSquare(null);
                setCheckmateSquare(null);
                break;
        }
    }, [turn]);

    const isOnCurrentMove = () => {
        // console.log("isOnCurrentMov÷e ", moveNumber, moves);
        return moves.length === moveNumber;
    };

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
        if (!isOnCurrentMove() || checkmateSquare !== null) {
            return;
        }

        if (chosenSquare === null) {
            const chosenSquareIsValidWithoutCheck =
                (turn === WHITE &&
                    getColor(boardState[rank][file]) === WHITE) ||
                (turn === BLACK && getColor(boardState[rank][file]) === BLACK);

            const chosenSquareIsValid = chosenSquareIsValidWithoutCheck;

            if (chosenSquareIsValid) {
                setChosenSquare({ file, rank });
            }
        } else if (
            (file !== chosenSquare.file || rank !== chosenSquare.rank) &&
            isValidMove(file, rank)
        ) {
            movePiece(file, rank, onMoveFinish);
        } else {
            setChosenSquare(null);
        }
    };

    const isValidMove = (file: number, rank: number): boolean => {
        if (chosenSquare === null) return false;

        const tempBoard = boardState.map((row) => row.slice());

        updateBoard({ file, rank }, chosenSquare, tempBoard);

        const kingSquare = getKingSquare(tempBoard, turn);
        if (kingSquare === null) return false;

        return !isSquareInCheck(tempBoard, kingSquare, turn);
    };

    // const chosenSquareValidityForChecks = (
    //     file: number,
    //     rank: number
    // ): boolean => {
    //     if (checkSquare === null) {
    //         return true;
    //     }

    //     const checkingSquares = getAttackingSquare(
    //         boardState,
    //         checkSquare,
    //         turn
    //     );
    //     console.log(checkingSquares);

    //     if (checkingSquares.length > 1) {
    //         return rank === checkSquare.rank && file === checkSquare.file;
    //     }

    //     const checkingSquare = checkingSquares[0];

    //     const validSquares = [
    //         ...getInterceptingPieceSquares(
    //             boardState,
    //             checkSquare,
    //             checkingSquare,
    //             turn
    //         ),
    //         checkSquare,
    //     ];

    //     let isValid = false;

    //     validSquares.forEach((square) => {
    //         if (square.file === file && square.rank === rank) {
    //             isValid = true;
    //         }
    //     });

    //     return isValid;
    // };

    const setNewMoves = (
        newMoves: Move[],
        moveTillEnd: boolean,
        playerColor: Color
    ) => {
        console.log({ set: "set", moveNumber, moves, newMoves });

        let currentMoveNumber = moveNumber;

        while (currentMoveNumber < newMoves.length && moveTillEnd) {
            currentMoveNumber++;
            moveForward(currentMoveNumber, moveNumber, boardState, newMoves);
        }
        setMoveNumber(currentMoveNumber);
        console.log(newMoves);
        console.log(moves);
        console.log(newMoves.length - moves.length);

        setTurn(playerColor);

        setMoves(newMoves);
    };

    return {
        boardState,
        moves,
        moveNumber,
        chosenSquare,
        checkSquare,
        checkmateSquare,
        turn,
        setBoardState,
        setMoves,
        isOnCurrentMove,
        setMoveNumber,
        onChoseSquare,
        addMove,
        changeMove,
        goToFirstMove,
        goToLastMove,
        setNewMoves,
    };
};
