import styles from "./ChangeMoveLayout.module.css";

import ChangeMoveButton from "../ui/ChangeMoveButton";
import { useContext } from "react";
import { BoardContext } from "../../store/board-context";

const ChangeMoveLayout = () => {
  const { changeMove, moveNumber, isOnCurrentMove } = useContext(BoardContext);

  return (
    <div className={styles.container}>
      <ChangeMoveButton>&#8612;</ChangeMoveButton>
      <ChangeMoveButton
        onClick={() => changeMove(moveNumber - 1)}
        disabled={moveNumber === 0}
      >
        &#8606;
      </ChangeMoveButton>
      <ChangeMoveButton
        onClick={() => changeMove(moveNumber + 1)}
        disabled={isOnCurrentMove()}
      >
        &#8608;
      </ChangeMoveButton>
      <ChangeMoveButton>&#8614;</ChangeMoveButton>
    </div>
  );
};

export default ChangeMoveLayout;
