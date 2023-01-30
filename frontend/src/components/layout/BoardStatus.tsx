import styles from "./BoardStatus.module.css";
import MoveContainer from "./MoveContainer";

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
