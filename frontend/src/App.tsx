import "./App.css";
import GamePage from "./pages/GamePage";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router";
import BoardPage from "./pages/BoardPage";
import { BoardProvider } from "./store/board-context";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

function App() {
    return (
        <Layout>
            <Routes>
                <Route
                    path="/game"
                    element={
                        <BoardProvider>
                            <GamePage />
                        </BoardProvider>
                    }
                />
                <Route
                    path="/board"
                    element={
                        <BoardProvider>
                            <BoardPage />
                        </BoardProvider>
                    }
                />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </Layout>
    );
}

export default App;
