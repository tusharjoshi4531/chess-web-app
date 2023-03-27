import { Piece, Square } from "chess.js";
import Chessboard from "chessboardjsx";
import { useContext, useState } from "react";
import GameContext from "../../store/game/game-context";

import styles from "./GameBoard.module.css";

interface IGameBoardProps {
    size: number;
}

const GameBoard: React.FC<IGameBoardProps> = ({ size }) => {
    const { game } = useContext(GameContext);
    const [pos, setPos] = useState(game.fen());

    const pieceDropHandler = (sourceSquare: Square, targetSquare: Square) => {
        try {
            game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });
            setPos(game.fen());
        } catch (e) {
            console.log(e);
        }
        console.log(game.fen());
    };

    const allowDragHandler = (piece: string) => {
        return (
            (game.turn() === "w" && "wPwRwNwBwQwK".includes(piece)) ||
            (game.turn() === "b" && "bPbRbNbBbQbK".includes(piece))
        );
    };

    return (
        <div className={styles.boardContainer} style={{ width: size }}>
            <Chessboard
                width={size}
                position={pos}
                onDrop={({ sourceSquare, targetSquare }) =>
                    pieceDropHandler(sourceSquare, targetSquare)
                }
                allowDrag={({ piece }) => allowDragHandler(piece)}
            />
        </div>
    );
};

export default GameBoard;
