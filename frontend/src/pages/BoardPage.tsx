import { useContext } from "react";
import ChessBoard from "../components/game/ChessBoard";
import ChangeMoveLayout from "../components/layout/ChangeMoveLayout";
import GameLayout from "../components/layout/GameLayout";
import { Move } from "../global/types";
import { BoardContext } from "../store/board-context";

const BoardPage = () => {
  const { isOnCurrentMove, onChoseSquare, addMove } = useContext(BoardContext);

  const moveFinishHandler = (move: Move) => {
    addMove(move);
  };

  const cellClickHandler = (file: number, rank: number) => {
    if (!isOnCurrentMove()) return;

    onChoseSquare(file, rank, moveFinishHandler);
  };

  return (
    <GameLayout
      game={
        <>
          <ChessBoard size={600} onCellClick={cellClickHandler} />
          <ChangeMoveLayout />
        </>
      }
      status={<div>hi</div>}
    />
  );
};

export default BoardPage;
