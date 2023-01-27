import styles from "./Header.module.css";

type HeaderPops = {
    onClickLogin: React.MouseEventHandler<HTMLButtonElement>;
    onClickSignup: React.MouseEventHandler<HTMLButtonElement>;
};

const Header = ({ onClickLogin, onClickSignup }: HeaderPops) => {
    return (
        <div className={styles.container}>
            <h3>App</h3>
            <div className={styles.buttonContainer}>
                <button onClick={onClickLogin}>Login</button>
                <button onClick={onClickSignup}>Signup</button>
            </div>
        </div>
    );
};

export default Header;
