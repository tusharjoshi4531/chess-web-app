import { useNavigate } from "react-router";
import Header from "./Header";
import styles from "./Layout.module.css";
import NavigationDrawer from "./NavigationDrawer";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const navigate = useNavigate();

    const homeClickHandler = () => {
        navigate("/");
    };

    const gameClickHandler = () => {
        navigate("/game");
    };

    const boardClickHandler = () => {
        navigate("/board");
    };

    const loginClickHandler = () => {
        navigate("/login");
    };

    const signupClickHandler = () => {
        navigate("/signup");
    };

    return (
        <div className={styles.layout}>
            <header>
                <Header
                    onClickLogin={loginClickHandler}
                    onClickSignup={signupClickHandler}
                />
            </header>
            <aside>
                <NavigationDrawer
                    onClickHome={homeClickHandler}
                    onClickBoard={boardClickHandler}
                    onClickGame={gameClickHandler}
                />
            </aside>
            <section>{children}</section>
        </div>
    );
};

export default Layout;
