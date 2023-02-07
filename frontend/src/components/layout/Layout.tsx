import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../store/user-context";
import Modal from "../ui/Modal";
import Header from "./Header";
import styles from "./Layout.module.css";
import NavigationDrawer from "./NavigationDrawer";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const navigate = useNavigate();
    const { socket, challengeData, roomId, updateUserInfo, setChallengeData } =
        useContext(UserContext);

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

    const logoutClickHandler = () => {
        updateUserInfo("", "", "", "");
        socket?.emit("disconnect-user");
        navigate("/");
    };

    const modalConfirmHandler = () => {
        if (socket) {
            socket.emit(
                "challenge-accepted",
                challengeData,
                (message: string) => {
                    alert(message);
                }
            );
        }
    };

    const modalCancelHandler = () => {
        // console.log("cancel");
        setChallengeData(undefined);
    };

    return (
        <>
            {challengeData !== undefined && roomId === "" && (
                <Modal
                    confirm="Accept"
                    cancel="Decline"
                    onConfirm={modalConfirmHandler}
                    onCancel={modalCancelHandler}
                >
                    <h2>{challengeData?.challenger} has challenged you</h2>
                </Modal>
            )}
            <div className={styles.layout}>
                <header>
                    <Header
                        onClickLogin={loginClickHandler}
                        onClickSignup={signupClickHandler}
                        onClickLogout={logoutClickHandler}
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
        </>
    );
};

export default Layout;
