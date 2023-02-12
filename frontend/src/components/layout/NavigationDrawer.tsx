import { useContext } from "react";
import { UserContext } from "../../store/user-context";
import NavigationDrawerButton from "../ui/NavigationDrawerButton";
import styles from "./NavigationDrawer.module.css";

type NavigationDrawerProps = {
    onClickHome: React.MouseEventHandler<HTMLButtonElement>;
    onClickGame: React.MouseEventHandler<HTMLButtonElement>;
    onClickBoard: React.MouseEventHandler<HTMLButtonElement>;
};

const NavigationDrawer = ({
    onClickHome,
    onClickGame,
    onClickBoard,
}: NavigationDrawerProps) => {
    const { roomId } = useContext(UserContext);

    return (
        <div className={styles.container}>
            <NavigationDrawerButton onClick={onClickHome}>
                Home
            </NavigationDrawerButton>
            {roomId && (
                <NavigationDrawerButton onClick={onClickGame}>
                    Game
                </NavigationDrawerButton>
            )}
            <NavigationDrawerButton onClick={onClickBoard}>
                Board
            </NavigationDrawerButton>
        </div>
    );
};

export default NavigationDrawer;
