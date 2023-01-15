import { useEffect, useState } from "react";
import ChessBoard from "../components/game/ChessBoard";
import GamePageLayout from "../components/layout/GameLayout";

const BoardPage = () => {

  const cellClickHandler = (file: number, rank: number) => {
    console.log({ file, rank });
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
