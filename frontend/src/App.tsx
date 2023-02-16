import "./App.css";
import GamePage from "./pages/GamePage";
import Layout from "./components/layout/Layout";
import { Navigate, Route, Routes } from "react-router";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./store/user-context";
import { useContext, useEffect } from "react";
import HomePage from "./pages/HomePage";
import { GameContext } from "./store/game-context";
import { BLACK, WHITE } from "./global/types";

function App() {
    const { userId, roomId, challengeData, methods, username } =
        useContext(UserContext);
    const { setGameDisplayMoves, gameMethods } = useContext(GameContext);

    useEffect(() => {
        if (challengeData !== undefined) {
            methods.addMoveMadeEvent((moves, displayMoves) => {
                setGameDisplayMoves(displayMoves);

                const playerMove =
                    challengeData.black === username ? BLACK : WHITE;

                console.log(playerMove);

                gameMethods.setNewMoves(moves, true, playerMove);
                console.log(displayMoves);
            });
        }
    }, [challengeData]);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {roomId !== "" && <Route path="/game" element={<GamePage />} />}
                <Route path="/board" element={<BoardPage />} />
                {userId === "" && (
                    <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignupPage />} />
                    </>
                )}
                <Route path="" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
}

export default App;
