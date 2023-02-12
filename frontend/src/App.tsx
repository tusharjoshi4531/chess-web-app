import "./App.css";
import GamePage from "./pages/GamePage";
import Layout from "./components/layout/Layout";
import { Navigate, Route, Routes } from "react-router";
import BoardPage from "./pages/BoardPage";
import { BoardProvider } from "./store/board-context";
import { GameProvider } from './store/game-context'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { UserContext } from "./store/user-context";
import { useContext } from "react";
import HomePage from "./pages/HomePage";

function App() {
    const { userId, roomId } = useContext(UserContext);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {roomId !== "" && (
                    <Route
                        path="/game"
                        element={
                            <GameProvider>
                                <GamePage />
                            </GameProvider>
                        }
                    />
                )}
                <Route
                    path="/board"
                    element={
                        <BoardProvider>
                            <BoardPage />
                        </BoardProvider>
                    }
                />
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
