import { createContext, useState } from "react";
import { initialBoardState } from "../global/InitialBoardState";
import {
  BLACK,
  BoardState,
  Color,
  Piece,
  Square,
  WHITE,
} from "../global/types";

type BoardContextData = {
  boardState: BoardState;
  chosenSquare: Square | null;
  enPassentSquare: Square | null;
  turn: Color;
  setChosenSquare: React.Dispatch<React.SetStateAction<Square | null>>;
  setEnPassentSquare: React.Dispatch<React.SetStateAction<Square | null>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setTurn: React.Dispatch<React.SetStateAction<Color>>;
  getColor: (piece: Piece) => Color | null;
  checkPawn: (color: Color, cordinate: Square) => boolean;
  checkBishop: (cordinate: Square) => boolean;
  checkKnight: (cordinate: Square) => boolean;
  checkRook: (cordinate: Square) => boolean;
  checkQueen: (cordinate: Square) => boolean;
  checkKing: (cordinate: Square) => boolean;
};

type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextData>({
  boardState: initialBoardState,
  chosenSquare: null,
  enPassentSquare: null,
  turn: 0,
  setChosenSquare: () => {},
  setEnPassentSquare: () => {},
  setBoardState: () => {},
  setTurn: () => {},
  getColor: () => null,
  checkPawn: () => true,
  checkBishop: () => true,
  checkKnight: () => true,
  checkRook: () => true,
  checkQueen: () => true,
  checkKing: () => true,
});

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [chosenSquare, setChosenSquare] = useState<Square | null>(null);
  const [enPassentSquare, setEnPassentSquare] = useState<Square | null>(null);
  const [turn, setTurn] = useState<Color>(0);

  const getColor = (piece: Piece): Color | null => {
    if (piece === null) return null;
    if (piece < 6) return WHITE;
    else return BLACK;
  };

  const checkPawn = (color: Color, cordinate: Square) => {
    const dir = 1 - 2 * color;
    const startingRank = color === WHITE ? 1 : 6;

    if (chosenSquare === null) return false;

    if (
      enPassentSquare !== null &&
      cordinate.file === enPassentSquare.file &&
      cordinate.rank === enPassentSquare.rank
    ) {
      return true;
    }

    if (
      cordinate.file === chosenSquare.file &&
      cordinate.rank === chosenSquare.rank + 1 * dir &&
      boardState[cordinate.rank][cordinate.file] === null
    ) {
      return true;
    }

    if (
      cordinate.file === chosenSquare.file &&
      chosenSquare.rank === startingRank &&
      cordinate.rank === startingRank + 2 * dir &&
      boardState[cordinate.rank][cordinate.file] === null
    ) {
      return true;
    }

    if (
      cordinate.rank === chosenSquare.rank + 1 * dir &&
      (cordinate.file === chosenSquare.file + 1 ||
        cordinate.file === chosenSquare.file - 1) &&
      getColor(boardState[cordinate.rank][cordinate.file]) === (1 ^ color)
    ) {
      return true;
    }
    return false;
  };

  const checkBishop = (cordinate: Square) => {
    if (chosenSquare === null) return false;

    const dirFile = Math.sign(cordinate.file - chosenSquare.file);
    const dirRank = Math.sign(cordinate.rank - chosenSquare.rank);

    let file = chosenSquare.file + dirFile;
    let rank = chosenSquare.rank + dirRank;

    while (file !== cordinate.file && rank !== cordinate.rank) {
      if (boardState[rank][file] !== null) {
        return false;
      }
      file += dirFile;
      rank += dirRank;
    }

    return true;
  };

  const checkKnight = (cordinate: Square) => {
    if (chosenSquare === null) return false;

    const len = Math.max(
      Math.abs(cordinate.file - chosenSquare.file),
      Math.abs(cordinate.rank - chosenSquare.rank)
    );
    const wid = Math.min(
      Math.abs(cordinate.rank - chosenSquare.rank),
      Math.abs(cordinate.file - chosenSquare.file)
    );

    console.log({ len, wid });

    if (len !== 2 || wid !== 1) {
      return false;
    } else {
      return true;
    }
  };

  const checkRook = (cordinate: Square) => {
    if (chosenSquare === null) return false;

    const dirFile = Math.sign(cordinate.file - chosenSquare.file);
    const dirRank = Math.sign(cordinate.rank - chosenSquare.rank);

    if (dirFile !== 0 && dirRank !== 0) return false;

    if (dirFile !== 0) {
      let file = chosenSquare.file + dirFile;
      while (file !== cordinate.file) {
        if (boardState[chosenSquare.rank][file] !== null) return false;
        file += dirFile;
      }
    }

    if (dirRank !== 0) {
      let rank = chosenSquare.rank + dirRank;
      while (rank !== cordinate.rank) {
        if (boardState[rank][chosenSquare.file] !== null) return false;
        rank += dirRank;
      }
    }

    return true;
  };

  const checkQueen = (cordinate: Square) => {
    return checkBishop(cordinate) || checkRook(cordinate);
  };

  const checkKing = (cordinate: Square) => {
    if (chosenSquare === null) return false;

    return (
      Math.abs(cordinate.file - chosenSquare.file) <= 1 &&
      Math.abs(cordinate.rank - chosenSquare.rank) <= 1
    );
  };

  const values: BoardContextData = {
    boardState,
    chosenSquare,
    enPassentSquare,
    turn,
    setChosenSquare,
    setEnPassentSquare,
    setBoardState,
    setTurn,
    getColor,
    checkPawn,
    checkBishop,
    checkKnight,
    checkRook,
    checkQueen,
    checkKing
  };

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
