import { useContext } from "react";
import { Color, WHITE } from "../../global/types";
import { BoardContext } from "../../store/board-context";
import styles from "./ChessBoard.module.css";
import ChessBoardCell from "./ChessBoardCell";

type ChessBoardProps = {
    size: number;
    color: Color;
    onCellClick: (file: number, rank: number) => void;
};

const ChessBoard = ({ size, color, onCellClick }: ChessBoardProps) => {
    const { boardState } = useContext(BoardContext);

    const cells: JSX.Element[] = [];
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const type = (i + j) % 2 === 1 ? 1 : 0;
            const rank = color === WHITE ? 7 - i : i;
            const file = color === WHITE ? j : 7 - j;
            const displayFile = color === WHITE ? rank === 0 : rank === 7;
            const displayRank = color === WHITE ? file === 7 : file === 0;
            const piece = boardState[rank][file];

            cells.push(
                <ChessBoardCell
                    key={`${i}${j}`}
                    type={type}
                    cordinate={{ rank, file }}
                    displayFile={displayFile}
                    displayRank={displayRank}
                    peice={piece}
                    onClick={onCellClick}
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
