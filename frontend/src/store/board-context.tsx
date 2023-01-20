import { createContext, useState } from "react";
import { initialBoardState } from "../global/InitialBoardState";
import {
  BLACK,
  BoardState,
  Color,
  Move,
  Piece,
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
import {
  getColor,
  checkPawn,
  checkBishop,
  checkKing,
  checkKnight,
  checkQueen,
  checkRook,
} from "../helper/piece-check";

type BoardContextData = {
  moveNumber: number;
  isOnCurrentMove: () => boolean;
  setMoveNumber: React.Dispatch<React.SetStateAction<number>>;
  onChoseSquare: (
    file: number,
    rank: number,
    onMoveFinish?: (changes: Move) => void
  ) => void;
  addMove: (move: Move) => void;
  changeMove: (targetMoveNumber: number) => void;
};

type BoardProviderProps = {
  children: React.ReactNode;
};

export const BoardContext = createContext<BoardContextData>({
  moveNumber: 0,
  isOnCurrentMove: () => true,
  setMoveNumber: () => {},
  addMove: () => {},
  onChoseSquare: () => {},
  changeMove: () => {},
});

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const [boardState, setBoardState] = useState<BoardState>(initialBoardState);
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
        return moveBack(targetMoveNumber, moveNumber, state);
      } else {
        return moveForward(targetMoveNumber, moveNumber, state);
      }
    });
    setMoveNumber(targetMoveNumber);
  };

  const moveBack = (
    targetMoveNumber: number,
    currentMoveNumber: number,
    state: BoardState
  ): BoardState => {
    while (currentMoveNumber != targetMoveNumber) {
      currentMoveNumber -= 1;
      const currentMove = moves[currentMoveNumber];
      console.log(currentMove);

      currentMove.forEach((change) => {
        const rank = Math.floor(change[0] / 10);
        const file = change[0] % 10;

        state[rank][file] = change[1];
      });
    }
    return state;
  };

  const moveForward = (
    targetMoveNumber: number,
    currentMoveNumber: number,
    state: BoardState
  ): BoardState => {
    while (currentMoveNumber != targetMoveNumber) {
      const currentMove = moves[currentMoveNumber];
      console.log(currentMove);

      currentMove.forEach((change) => {
        const rank = Math.floor(change[0] / 10);
        const file = change[0] % 10;

        state[rank][file] = change[2];
      });
      currentMoveNumber += 1;
    }
    return state;
  };

  const updateBoard = (
    file: number,
    rank: number,
    changes: BoardChange[],
    callBack: (state: BoardState) => void = () => {}
  ) => {
    if (chosenSquare === null) return;

    setBoardState((state) => {
      changes.push([
        rank * 10 + file,
        state[rank][file],
        state[chosenSquare.rank][chosenSquare.file],
      ]);
      state[rank][file] = state[chosenSquare.rank][chosenSquare.file];

      changes.push([
        chosenSquare.rank * 10 + chosenSquare.file,
        state[chosenSquare.rank][chosenSquare.file],
        null,
      ]);
      state[chosenSquare.rank][chosenSquare.file] = null;

      setChosenSquare(null);
      setTurn((turn) => (turn === WHITE ? BLACK : WHITE));

      callBack(state);

      return state;
    });
  };

  const movePiece = (
    file: number,
    rank: number,
    onMoveFinish: (changes: BoardChange[]) => void
  ) => {
    if (chosenSquare === null) return null;

    const changes: BoardChange[] = [];

    if (getColor(boardState[rank][file]) === turn) {
      setChosenSquare(null);
      return null;
    } else if (
      (boardState[chosenSquare.rank][chosenSquare.file] === W_P ||
        boardState[chosenSquare.rank][chosenSquare.file] === B_P) &&
      checkPawn(boardState, turn, { file, rank }, chosenSquare, enPassentSquare)
    ) {
      updateBoard(file, rank, changes, (state) => {
        if (
          enPassentSquare !== null &&
          enPassentSquare.file === file &&
          enPassentSquare.rank === rank
        ) {
          changes.push([
            file * 10 + chosenSquare.rank,
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
        onMoveFinish(changes);
      });
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
        updateBoard(file, rank, changes, (state) => onMoveFinish(changes));
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
        (turn === WHITE && getColor(boardState[rank][file]) === WHITE) ||
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
    isOnCurrentMove,
    setMoveNumber,
    onChoseSquare,
    addMove,
    changeMove,
  };

  return (
    <BoardContext.Provider value={values}>{children}</BoardContext.Provider>
  );
};
