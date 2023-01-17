import { useContext } from "react";
import ChessBoard from "../components/game/ChessBoard";
import GamePageLayout from "../components/layout/GameLayout";
import {
  BLACK,
  BoardState,
  B_B,
  B_K,
  B_N,
  B_P,
  B_Q,
  B_R,
  WHITE,
  W_B,
  W_K,
  W_N,
  W_P,
  W_Q,
  W_R,
} from "../global/types";
import { BoardContext } from "../store/board-context";

const BoardPage = () => {
  const {
    boardState,
    turn,
    chosenSquare,
    enPassentSquare,
    setBoardState,
    setChosenSquare,
    setEnPassentSquare,
    getColor,
    setTurn,
    checkPawn,
    checkBishop,
    checkKnight,
    checkRook,
    checkQueen,
    checkKing,
  } = useContext(BoardContext);

  const updateBoard = (
    file: number,
    rank: number,
    callBack: (state: BoardState) => void = () => {}
  ) => {
    if (chosenSquare === null) return;

    setBoardState((state) => {
      state[rank][file] = state[chosenSquare.rank][chosenSquare.file];
      state[chosenSquare.rank][chosenSquare.file] = null;

      setChosenSquare(null);
      setTurn((turn) => (turn === WHITE ? BLACK : WHITE));

      callBack(state);

      return state;
    });
  };

  const cellClickHandler = (file: number, rank: number) => {
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
    } else if (getColor(boardState[rank][file]) === turn) {
      setChosenSquare(null);
    } else if (
      (boardState[chosenSquare.rank][chosenSquare.file] === W_P ||
        boardState[chosenSquare.rank][chosenSquare.file] === B_P) &&
      checkPawn(turn, { file, rank })
    ) {
      updateBoard(file, rank, (state) => {
        if (
          enPassentSquare !== null &&
          enPassentSquare.file === file &&
          enPassentSquare.rank === rank
        ) {
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
      });
    } else {
      const isValidMove =
        ((boardState[chosenSquare.rank][chosenSquare.file] === W_B ||
          boardState[chosenSquare.rank][chosenSquare.file] === B_B) &&
          checkBishop({ file, rank })) ||
        ((boardState[chosenSquare.rank][chosenSquare.file] === W_N ||
          boardState[chosenSquare.rank][chosenSquare.file] === B_N) &&
          checkKnight({ file, rank })) ||
        ((boardState[chosenSquare.rank][chosenSquare.file] === W_R ||
          boardState[chosenSquare.rank][chosenSquare.file] === B_R) &&
          checkRook({ file, rank })) ||
        ((boardState[chosenSquare.rank][chosenSquare.file] === W_Q ||
          boardState[chosenSquare.rank][chosenSquare.file] === B_Q) &&
          checkQueen({ file, rank })) ||
        ((boardState[chosenSquare.rank][chosenSquare.file] === W_K ||
          boardState[chosenSquare.rank][chosenSquare.file] === B_K) &&
          checkKing({ file, rank }));

      if (isValidMove) {
        updateBoard(file, rank);
      } else {
        setChosenSquare(null);
      }
    }
  };

  return (
    <GamePageLayout
      game={
        <>
          <ChessBoard size={600} onCellClick={cellClickHandler} />
        </>
      }
      status={<div>hi</div>}
    />
  );
};

export default BoardPage;
