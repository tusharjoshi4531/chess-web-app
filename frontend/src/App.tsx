import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChessBoard from "./components/game/ChessBoard";
import GamePage from "./pages/GamePage";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <GamePage />
    </Layout>
  );
}

export default App;
