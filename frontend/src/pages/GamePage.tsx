import { useContext } from "react";
import ChessBoard from "../components/game/ChessBoard";
import BoardStatus from "../components/layout/BoardStatus";
import GameLayout from "../components/layout/GameLayout";
import Timer from "../components/ui/Timer";
import { BLACK, Move, Square, WHITE } from "../global/types";
import { GameContext } from "../store/game-context";
import { UserContext } from "../store/user-context";

const GamePage = () => {
    const { challengeData, username, socket, roomId } = useContext(UserContext);
    const {
        gameBoardState: boardState,
        gameMethods,
        gameDisplayMoves: moves,
        setGameDisplayMoves: setMoves,
        gameChosenSquare: chosenSquare,
        gameCheckSquare: checkSquare,
        gameCheckmateSquare: checkmateSquare,
        gameMoves,
    } = useContext(GameContext);

    const { isOnCurrentMove, onChoseSquare, addMove, turn } = gameMethods;

    const challengeColor = challengeData!.black === username ? BLACK : WHITE;

    const squareToStringEquivalent = (square: Square) =>
        `${String.fromCharCode(square.file + 97)}${square.rank + 1}`;

    const moveFinishHandler = (
        move: Move,
        prevSquare?: Square,
        currentSquare?: Square
    ) => {
        if (prevSquare === undefined || currentSquare === undefined) return;

        const updatedMoves = [...gameMoves, move];

        addMove(move);

        const displayMove = `${squareToStringEquivalent(
            prevSquare
        )}-${squareToStringEquivalent(currentSquare)}`;

        const updatedDisplayMoves = [...moves, displayMove];

        setMoves((state) => [...state, displayMove]);

        console.log(updatedMoves);
        console.log(updatedDisplayMoves);

        if (socket) {
            const color = challengeColor === WHITE ? "white" : "black";

            socket.emit(
                "move-made",
                {
                    moves: updatedMoves,
                    displayMoves: updatedDisplayMoves,
                    color,
                    room: roomId,
                },
                (success: boolean) => {
                    if (!success) {
                        alert("Failed to send move");
                    }
                }
            );
        }
    };

    const cellClickHandler = (file: number, rank: number) => {
        if (!isOnCurrentMove() || turn !== challengeColor) return;

        console.log(file, rank);

        onChoseSquare(file, rank, moveFinishHandler);
    };

    if (!challengeData) {
        return <h2>No Challenge Present</h2>;
    }

    return (
        // <ChessBoard size={600}/>
        <GameLayout
            game={
                <>
                    <Timer color="black" />
                    <ChessBoard
                        size={600}
                        onCellClick={cellClickHandler}
                        color={challengeColor}
                        boardState={boardState}
                        chosenSquare={chosenSquare}
                        checkedSquare={checkSquare}
                        checkmateSquare={checkmateSquare}
                    />
                    <Timer color="white" />
                </>
            }
            status={<BoardStatus displayMoves={moves} />}
        />
    );
};

export default GamePage;
