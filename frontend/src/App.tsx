import "./App.css";
import GamePage from "./pages/GamePage";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router";
import BoardPage from "./pages/BoardPage";
import { BoardProvider } from "./store/board-context";

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
      </Routes>
    </Layout>
  );
}

export default App;
