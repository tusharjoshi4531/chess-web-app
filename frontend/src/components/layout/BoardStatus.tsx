import styles from "./BoardStatus.module.css";
import MoveContainer from "./MoveContainer";

const dummymoves = ["e2-e4", "e7-e5"];

type BoardStatusProps = {
  displayMoves: string[];
};

const BoardStatus = ({ displayMoves }: BoardStatusProps) => {
  return (
    <div className={styles.container}>
      <MoveContainer moves={displayMoves} />
    </div>
  );
};

export default BoardStatus;
