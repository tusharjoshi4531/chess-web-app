import { createContext, useState } from "react";
import { initialBoardState } from "../global/InitialBoardState";
import { BoardState, Square } from "../global/types";

type BoardContextData = {
  boardState: BoardState;
  chosenSquare: Square | null;
  setChosenSquare: React.Dispatch<React.SetStateAction<Square | null>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState>>;
};

type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextData>({
  boardState: initialBoardState,
  chosenSquare: null,
  setChosenSquare: () => {},
  setBoardState: () => {},
});

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
  const [chosenSquare, setChosenSquare] = useState<Square | null>(null);

  const values: BoardContextData = {
    boardState,
    chosenSquare,
    setChosenSquare,
    setBoardState,
  };

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
