import { useContext } from "react";
import { UserContext } from "../../store/user-context";
import styles from "./Header.module.css";

type HeaderPops = {
    onClickLogin: React.MouseEventHandler<HTMLButtonElement>;
    onClickSignup: React.MouseEventHandler<HTMLButtonElement>;
    onClickLogout: React.MouseEventHandler<HTMLButtonElement>;
    title: string;
};

const Header = ({
    onClickLogin,
    onClickSignup,
    onClickLogout,
    title,
}: HeaderPops) => {
    const { username } = useContext(UserContext);

    return (
        <div className={styles.container}>
            <h3>{title}</h3>
            <div className={styles.actions}>
                {username === "" ? (
                    <>
                        <button onClick={onClickLogin}>Login</button>
                        <button onClick={onClickSignup}>Signup</button>
                    </>
                ) : (
                    <>
                        <h4>{username}</h4>
                        <button onClick={onClickLogout}>Logout</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
