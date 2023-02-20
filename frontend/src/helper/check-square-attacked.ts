import {
    BLACK,
    BoardState,
    B_B,
    B_K,
    B_N,
    B_P,
    B_Q,
    B_R,
    Color,
    Piece,
    Square,
    WHITE,
    W_B,
    W_K,
    W_N,
    W_P,
    W_Q,
    W_R,
} from "../global/types";
import { getColor } from "./check-piece";

export const getSquareStatus = (
    boardState: BoardState,
    square: Square,
    color: Color
): 0 | 1 | 2 => {
    const attackingSquares = getAttackingSquare(boardState, square, color);

    let status: 0 | 1 | 2 = 0;

    if (attackingSquares.length > 0) {
        status = 1;
    }

    if (
        status === 1 &&
        isSquareInCheckmate(boardState, square, attackingSquares, color)
    ) {
        status = 2;
    }

    return status;
};

export const isSquareAttacked = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): boolean => {
    let attackingSquares = getAttackingSquare(boardState, cordinate, color);

    return attackingSquares.length > 0;
};

export const getKingSquare = (
    boardState: BoardState,
    color: Color
): Square | null => {
    const targetKing = color === WHITE ? W_K : B_K;

    for (let rank = 0; rank < 8; rank++) {
        for (let file = 0; file < 8; file++) {
            if (boardState[rank][file] === targetKing) {
                return { file, rank };
            }
        }
    }
    return null;
};

export const isSquareInCheckmate = (
    boardState: BoardState,
    kingSquare: Square,
    attackingSquares: Square[],
    color: Color
): boolean => {
    const kingMoves: number[][] = [
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    const { rank, file } = kingSquare;

    const attackingSquare =
        attackingSquares.length !== 1 ? null : attackingSquares[0];

    const attackingPiece =
        attackingSquare === null
            ? null
            : boardState[attackingSquare.rank][attackingSquare.file];

    let isCheckmate: boolean = true;
    kingMoves.forEach(([drank, dfile]) => {
        if (!isCheckmate) return;

        const newFile = file + dfile;
        const newRank = rank + drank;

        if (
            newFile > 7 ||
            newFile < 0 ||
            newRank > 7 ||
            newRank < 0 ||
            getColor(boardState[rank + drank][file + dfile]) === color
        ) {
            return;
        }

        if (
            !isSquareAttacked(
                boardState,
                { file: file + dfile, rank: rank + drank },
                color
            )
        ) {
            isCheckmate = false;
            return;
        }
    });

    if (!isCheckmate) return false;

    if (attackingSquare === null) {
        return isCheckmate;
    }

    console.log({ attackingPiece, attackingSquare });

    if (
        attackingPiece !== W_P &&
        attackingPiece !== B_P &&
        attackingPiece !== W_N &&
        attackingPiece !== B_N
    ) {
        const dirFile = Math.sign(attackingSquare.file - file);
        const dirRank = Math.sign(attackingSquare.file - rank);

        let currFile = file;
        let currRank = rank;
        console.log({
            attackingSquare,
            attackingPiece,
            kingSquare,
            currFile,
            currRank,
            dirFile,
            dirRank,
        });

        while (
            currFile !== attackingSquare.file &&
            currRank !== attackingSquare.rank
        ) {
            currFile += dirFile;
            currRank += dirRank;

            const currAttackingSquares = getAttackingSquare(
                boardState,
                { file: currFile, rank: currRank },
                color === WHITE ? BLACK : WHITE
            ).filter(
                (square) =>
                    square.file !== kingSquare.file ||
                    square.rank !== kingSquare.rank
            );

            if (currAttackingSquares.length > 0) {
                isCheckmate = false;
                break;
            }
        }
    }

    if (
        (attackingPiece === W_N || attackingPiece === B_N) &&
        isSquareAttacked(
            boardState,
            attackingSquare,
            color === WHITE ? BLACK : WHITE
        )
    ) {
        isCheckmate = false;
    }

    return isCheckmate;
};

export const getAttackingSquare = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const attackedSquare: Square[] = [];

    attackedSquare.push(...getRookAttacks(boardState, cordinate, color));
    attackedSquare.push(...getBishopAttacks(boardState, cordinate, color));
    attackedSquare.push(...getPawnAttacks(boardState, cordinate, color));
    attackedSquare.push(...getQueenAttacks(boardState, cordinate, color));
    attackedSquare.push(...getKnightAttacks(boardState, cordinate, color));
    attackedSquare.push(...getKingAttacks(boardState, cordinate, color));

    return attackedSquare;
};

export const getKingAttacks = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const targetPiece = color === WHITE ? B_K : W_K;

    const moves: number[][] = [
        [1, 1],
        [-1, 1],
        [-1, -1],
        [1, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1],
    ];

    return getMovesAttacks(boardState, cordinate, targetPiece, moves);
};

export const getPawnAttacks = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const targetPiece = color === WHITE ? B_P : W_P;

    let moves: number[][] = [];

    if (color === WHITE) {
        moves = [
            [1, 1],
            [-1, 1],
        ];
    } else {
        moves = [
            [1, -1],
            [-1, -1],
        ];
    }

    return getMovesAttacks(boardState, cordinate, targetPiece, moves);
};

export const getKnightAttacks = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const targetPiece = color === WHITE ? B_N : W_N;

    const moves: number[][] = [
        [1, 2],
        [2, 1],
        [-1, 2],
        [-2, 1],
        [-1, -2],
        [-2, -1],
        [1, -2],
        [2, -1],
    ];

    return getMovesAttacks(boardState, cordinate, targetPiece, moves);
};

export const getQueenAttacks = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const targetColor = color === WHITE ? BLACK : WHITE;
    const targetPiece = color === WHITE ? B_Q : W_Q;

    const dirs: Square[] = [
        { file: 1, rank: 0 },
        { file: 0, rank: 1 },
        { file: -1, rank: 0 },
        { file: 0, rank: -1 },
        { file: 1, rank: 1 },
        { file: -1, rank: 1 },
        { file: -1, rank: -1 },
        { file: 1, rank: -1 },
    ];

    const attackingSquare: Square[] = dirs
        .map((dir) =>
            getLineAttack(boardState, cordinate, targetColor, targetPiece, dir)
        )
        .filter((square) => square !== null) as Square[];

    return attackingSquare;
};

export const getBishopAttacks = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const targetColor = color === WHITE ? BLACK : WHITE;
    const targetPiece = color === WHITE ? B_B : W_B;

    const dirs: Square[] = [
        { file: 1, rank: 1 },
        { file: -1, rank: 1 },
        { file: -1, rank: -1 },
        { file: 1, rank: -1 },
    ];

    const attackingSquare: Square[] = dirs
        .map((dir) =>
            getLineAttack(boardState, cordinate, targetColor, targetPiece, dir)
        )
        .filter((square) => square !== null) as Square[];

    return attackingSquare;
};

export const getRookAttacks = (
    boardState: BoardState,
    cordinate: Square,
    color: Color
): Square[] => {
    const targetColor = color === WHITE ? BLACK : WHITE;
    const targetPiece = color === WHITE ? B_R : W_R;

    const dirs: Square[] = [
        { file: 1, rank: 0 },
        { file: 0, rank: 1 },
        { file: -1, rank: 0 },
        { file: 0, rank: -1 },
    ];

    const attackingSquare: Square[] = dirs
        .map((dir) =>
            getLineAttack(boardState, cordinate, targetColor, targetPiece, dir)
        )
        .filter((square) => square !== null) as Square[];

    return attackingSquare;
};

export const getMovesAttacks = (
    boardState: BoardState,
    cordinate: Square,
    targetPiece: Piece,
    moves: number[][]
): Square[] => {
    let attackingSquares: Square[] = [];

    moves.forEach(([dfile, drank]) => {
        const file = cordinate.file + dfile;
        const rank = cordinate.rank + drank;

        if (file > 7 || file < 0 || rank > 7 || rank < 0) {
            return;
        }

        if (boardState[rank][file] === targetPiece) {
            attackingSquares.push({ file, rank });
        }
    });

    return attackingSquares;
};

export const getLineAttack = (
    boardState: BoardState,
    cordinate: Square,
    targetColor: Color,
    targetPiece: Piece,
    dir: Square
): Square | null => {
    let currSquare = { ...cordinate };
    currSquare.file += dir.file;
    currSquare.rank += dir.rank;

    let squares = [];

    while (
        currSquare.file < 8 &&
        currSquare.file >= 0 &&
        currSquare.rank < 8 &&
        currSquare.rank >= 0
    ) {
        squares.push(currSquare);
        const currPiece = boardState[currSquare.rank][currSquare.file];
        const playerKing = targetColor === BLACK ? W_K : B_K;

        if (currPiece === targetPiece) {
            return currSquare;
        } else if (currPiece !== playerKing && currPiece !== null) {
            // console.log({ currPiece, currSquare });
            return null;
        }

        currSquare.file += dir.file;
        currSquare.rank += dir.rank;
    }

    return null;
};
