import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ChessBoard from "./components/game/ChessBoard";

function App() {
  return (
    <div className="App">
      <ChessBoard size={600} />
    </div>
  );
}

export default App;
