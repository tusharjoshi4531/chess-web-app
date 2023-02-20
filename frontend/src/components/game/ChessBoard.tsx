import {
    BoardState,
    Color,
    Highlight,
    Square,
    WHITE,
} from "../../global/types";
import styles from "./ChessBoard.module.css";
import ChessBoardCell from "./ChessBoardCell";

type ChessBoardProps = {
    size: number;
    color: Color;
    boardState: BoardState;
    chosenSquare: Square | null;
    checkedSquare: Square | null;
    checkmateSquare: Square | null;
    onCellClick: (file: number, rank: number) => void;
};

const ChessBoard = ({
    size,
    color,
    boardState,
    chosenSquare,
    checkedSquare,
    checkmateSquare,
    onCellClick,
}: ChessBoardProps) => {
    const cells: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const type = (i + j) % 2 === 1 ? 1 : 0;
            const rank = color === WHITE ? 7 - i : i;
            const file = color === WHITE ? j : 7 - j;
            const displayFile = color === WHITE ? rank === 0 : rank === 7;
            const displayRank = color === WHITE ? file === 7 : file === 0;
            const piece = boardState[rank][file];

            let highlight: Highlight = "none";

            if (
                checkedSquare &&
                checkedSquare.file === file &&
                checkedSquare.rank === rank
            ) {
                highlight = "yellow";
            }

            if (
                chosenSquare &&
                chosenSquare.file === file &&
                chosenSquare.rank === rank
            ) {
                highlight = "blue";
            }

            if (
                checkmateSquare &&
                checkmateSquare.file === file &&
                checkmateSquare.rank === rank
            ) {
                highlight = "red";
            }

            cells.push(
                <ChessBoardCell
                    key={`${i}${j}`}
                    type={type}
                    cordinate={{ rank, file }}
                    displayFile={displayFile}
                    displayRank={displayRank}
                    peice={piece}
                    onClick={onCellClick}
                    highlight={highlight}
                />
            );
        }
    }

    return (
        <div className={styles.board} style={{ width: size, height: size }}>
            {cells}
        </div>
    );
};

export default ChessBoard;
