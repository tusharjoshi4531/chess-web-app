import ChessBoard from "../components/game/ChessBoard";
import GameLayout from "../components/layout/GameLayout";
import Timer from "../components/ui/Timer";

const GamePage = () => {
  

  const cellClickHandler = (file: number, rank: number) => {
    console.log({ file, rank });
  };

  return (
    // <ChessBoard size={600}/>
    <GameLayout
      game={
        <>
          <Timer color="black" />
          <ChessBoard size={600} onCellClick={cellClickHandler} />
          <Timer color="white" />
        </>
      }
      status={<div>hi</div>}
    />
  );
};

export default GamePage;
