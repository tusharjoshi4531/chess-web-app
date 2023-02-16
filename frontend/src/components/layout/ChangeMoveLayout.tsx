import styles from "./ChangeMoveLayout.module.css";

import ChangeMoveButton from "../ui/ChangeMoveButton";
import { IUseBoardData } from "../../global/types";

type ChangeMoveLayoutProps = {
    boardMethods: IUseBoardData;
};

const ChangeMoveLayout = ({ boardMethods }: ChangeMoveLayoutProps) => {
    const {
        moveNumber,
        changeMove,
        isOnCurrentMove,
        goToFirstMove,
        goToLastMove,
    } = boardMethods;

    return (
        <div className={styles.container}>
            <ChangeMoveButton
                onClick={() => goToFirstMove()}
                disabled={moveNumber === 0}
            >
                &#8612;
            </ChangeMoveButton>
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
            <ChangeMoveButton
                onClick={() => goToLastMove()}
                disabled={isOnCurrentMove()}
            >
                &#8614;
            </ChangeMoveButton>
        </div>
    );
};

export default ChangeMoveLayout;
