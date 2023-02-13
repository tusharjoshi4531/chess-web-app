import { useContext } from "react";
import ChessBoard from "../components/game/ChessBoard";
import BoardStatus from "../components/layout/BoardStatus";
import ChangeMoveLayout from "../components/layout/ChangeMoveLayout";
import GameLayout from "../components/layout/GameLayout";
import { Move, Square, WHITE } from "../global/types";
import { GameContext } from "../store/game-context";

const BoardPage = () => {
    const { analysisBoardState: boardState, analysisMethods, analysisDisplayMoves: moves, setAnalysisDisplayMoves: setMoves } =
        useContext(GameContext);

    const { isOnCurrentMove, onChoseSquare, addMove } = analysisMethods;

    const squareToStringEquivalent = (square: Square) =>
        `${String.fromCharCode(square.file + 97)}${square.rank + 1}`;

    const moveFinishHandler = (
        move: Move,
        prevSquare?: Square,
        currentSquare?: Square
    ) => {
        addMove(move);
        if (prevSquare !== undefined && currentSquare !== undefined) {
            const move = `${squareToStringEquivalent(
                prevSquare
            )}-${squareToStringEquivalent(currentSquare)}`;
            setMoves((state) => [...state, move]);
        }
    };

    const cellClickHandler = (file: number, rank: number) => {
        if (!isOnCurrentMove()) return;

        onChoseSquare(file, rank, moveFinishHandler);
    };

    return (
        <GameLayout
            game={
                <>
                    <ChessBoard
                        size={600}
                        onCellClick={cellClickHandler}
                        color={WHITE}
                        boardState={boardState}
                    />
                    <ChangeMoveLayout boardMethods={analysisMethods} />
                </>
            }
            status={<BoardStatus displayMoves={moves} />}
        />
    );
};

export default BoardPage;
