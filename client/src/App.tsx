import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Gamepage from "./pages/Gamepage";
import Loginpage from "./pages/Loginpage";
import Mainpage from "./pages/Mainpage";
import Signuppage from "./pages/Signuppage";
import GameContext from "./store/game/game-context";
function App() {
    const { gameData } = useContext(GameContext);

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Mainpage />} />
                <Route path="/login" element={<Loginpage />} />
                <Route path="/signup" element={<Signuppage />} />
                {gameData.roomId != "" && <Route path="/game" element={<Gamepage />} />}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
}

export default App;
