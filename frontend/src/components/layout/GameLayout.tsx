import styles from "./GameLayout.module.css";

type GameLayoutProps = {
  game: React.ReactNode;
  status: React.ReactNode;
};

const GameLayout = ({ game, status }: GameLayoutProps) => {
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

export default GameLayout;
