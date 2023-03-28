import { Chess, Square } from "chess.js";
import Chessboard from "chessboardjsx";

interface IGameBoardProps {
    size: number;
    game: Chess;
    color?: 0 | 1;
    pos: string;
    onMoveMade?: (newBoardState: string) => void;
}

const GameBoard: React.FC<IGameBoardProps> = ({
    size,
    game,
    pos,
    color = 2,
    onMoveMade = () => {},
}) => {
    const pieceDropHandler = (sourceSquare: Square, targetSquare: Square) => {
        try {
            game.move({
                from: sourceSquare,
                to: targetSquare,
                promotion: "q",
            });
            onMoveMade(game.fen());
        } catch (e) {
            console.log(e);
        }
        console.log(game.fen());
    };

    const allowDragHandler = (piece: string) => {
        return (
            (color !== 1 &&
                game.turn() === "w" &&
                "wPwRwNwBwQwK".includes(piece)) ||
            (color != 0 &&
                game.turn() === "b" &&
                "bPbRbNbBbQbK".includes(piece))
        );
    };

    return (
        <Chessboard
            width={size}
            position={pos}
            onDrop={({ sourceSquare, targetSquare }) =>
                pieceDropHandler(sourceSquare, targetSquare)
            }
            allowDrag={({ piece }) => allowDragHandler(piece)}
            orientation={color == 1 ? "black" : "white"}
        />
    );
};

export default GameBoard;
