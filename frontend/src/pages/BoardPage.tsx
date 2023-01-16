import { useContext, useEffect, useState } from "react";
import ChessBoard from "../components/game/ChessBoard";
import GamePageLayout from "../components/layout/GameLayout";
import { BLACK, B_P, WHITE, W_B, W_P } from "../global/types";
import { BoardContext } from "../store/board-context";

const BoardPage = () => {
  const {
    boardState,
    turn,
    setBoardState,
    chosenSquare,
    setChosenSquare,
    setTurn,
    getColor,
    checkPawn,
  } = useContext(BoardContext);

  const cellClickHandler = (file: number, rank: number) => {
    console.log({ file, rank }, chosenSquare);
    if (chosenSquare === null) {
      if (
        (turn === WHITE && boardState[rank][file] === W_P) ||
        (turn === BLACK && boardState[rank][file] === B_P)
      ) {
        setChosenSquare({ file, rank });
      }
    } else {
      if (
        (boardState[chosenSquare.rank][chosenSquare.file] === W_P &&
          checkPawn(WHITE, { file, rank })) ||
        (boardState[chosenSquare.rank][chosenSquare.file] === B_P &&
          checkPawn(BLACK, { file, rank }))
      ) {
        setBoardState((state) => {
          state[rank][file] = state[chosenSquare.rank][chosenSquare.file];
          state[chosenSquare.rank][chosenSquare.file] = null;
          setChosenSquare(null);
          setTurn((turn) => (turn === WHITE ? BLACK : WHITE));
          return state;
        });
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
