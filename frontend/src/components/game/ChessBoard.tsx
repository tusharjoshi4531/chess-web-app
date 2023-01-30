import { useContext } from "react";
import { BoardContext } from "../../store/board-context";
import styles from "./ChessBoard.module.css";
import ChessBoardCell from "./ChessBoardCell";

type ChessBoardProps = {
  size: number;
  onCellClick: (file: number, rank: number) => void;
};

const ChessBoard = ({ size, onCellClick }: ChessBoardProps) => {
  const { boardState } = useContext(BoardContext)

  const cells: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const type = (i + j) % 2 === 1 ? 1 : 0;
      const rank = 7 - i;
      const file = j;
      const displayFile = rank === 0;
      const displayRank = file === 7;
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
