import ChessBoard from "../game/ChessBoard";
import styles from "./GameLayout.module.css";

type GamePageLayoutProps = {
  game: React.ReactNode;
  status: React.ReactNode;
};

const GamePageLayout = ({ game, status }: GamePageLayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.game}>
        {game}
      </div>
      <div className={styles.status}>
        {status}
      </div>
    </div>
  );
};

export default GamePageLayout;
