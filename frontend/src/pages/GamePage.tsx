import ChessBoard from "../components/game/ChessBoard";
import GamePageLayout from "../components/layout/GamePageLayout";
import Timer from "../components/ui/Timer";

const GamePage = () => {
  return (
    // <ChessBoard size={600}/>
    <GamePageLayout
      game={
        <>
          <Timer color="black" />
          <ChessBoard size={600} />
          <Timer color="white" />
        </>
      }
      status={<div>hi</div>}
    />
  );
};

export default GamePage;
