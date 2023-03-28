import { useContext } from "react";
import { useNavigate } from "react-router";
import GameContext from "../../store/game/game-context";
import styles from "./Aside.module.css";

const Aside = () => {
    const { gameData } = useContext(GameContext);
    const navigate = useNavigate();

    const homeClickHandler = () => {
        navigate("");
    };
    const gameClickHandler = () => {
        navigate("/game");
    };

    return (
        <div className={styles.Aside}>
            <button onClick={homeClickHandler}>home</button>
            {gameData.roomId !== "" && (
                <button onClick={gameClickHandler}>game</button>
            )}
        </div>
    );
};

export default Aside;
