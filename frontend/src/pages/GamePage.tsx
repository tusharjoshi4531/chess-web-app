import ChessBoard from "../components/game/ChessBoard";
import GamePageLayout from "../components/layout/GamePageLayout";

const GamePage = () => {
  return (
    // <ChessBoard size={600}/>
    <GamePageLayout game={<ChessBoard size={600} />} status={<div>hi</div>} />
  );
};

export default GamePage;
