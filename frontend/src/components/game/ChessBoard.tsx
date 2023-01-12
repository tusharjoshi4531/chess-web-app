import styles from "./ChessBoard.module.css";
import ChessBoardCell from "./ChessBoardCell";

type ChessBoardProps = {
  size: number;
};

const ChessBoard = ({ size }: ChessBoardProps) => {
  const cells: JSX.Element[] = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const type = (i + j) % 2 == 1 ? "dark" : "light";
      const cordinate = { file: j, rank: 7 - i };

      cells.push(
        <ChessBoardCell
          key={`${i}${j}`}
          type={type}
          cordinate={cordinate}
          displayFile={cordinate.rank === 0}
          displayRank={cordinate.file === 7}
          peice="black-rook"
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
