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
  turn: Color;
  setChosenSquare: React.Dispatch<React.SetStateAction<Square | null>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
  setTurn: React.Dispatch<React.SetStateAction<Color>>;
  getColor: (piece: Piece) => Color | null;
  checkPawn: (color: Color, cordinate: Square) => boolean;
};

type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextData>({
  boardState: initialBoardState,
  chosenSquare: null,
  turn: 0,
  setChosenSquare: () => {},
  setBoardState: () => {},
  setTurn: () => {},
  getColor: () => null,
  checkPawn: () => true,
});

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [chosenSquare, setChosenSquare] = useState<Square | null>(null);
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

  const values: BoardContextData = {
    boardState,
    chosenSquare,
    turn,
    setChosenSquare,
    setBoardState,
    setTurn,
    getColor,
    checkPawn,
  };

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
