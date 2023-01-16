import styles from "./ChessBoardCell.module.css";

import bishop_b from "../../assets/bishop_b.png";
import bishop_w from "../../assets/bishop_w.png";
import king_b from "../../assets/king_b.png";
import king_w from "../../assets/king_w.png";
import knight_b from "../../assets/knight_b.png";
import knight_w from "../../assets/knight_w.png";
import pawn_b from "../../assets/pawn_b.png";
import pawn_w from "../../assets/pawn_w.png";
import queen_b from "../../assets/queen_b.png";
import queen_w from "../../assets/queen_w.png";
import rook_b from "../../assets/rook_b.png";
import rook_w from "../../assets/rook_w.png";
import {
  Color,
  Piece,
  W_B,
  W_K,
  W_P,
  W_Q,
  W_R,
  B_B,
  B_K,
  B_P,
  B_Q,
  B_R,
  BLACK,
  W_N,
  B_N,
} from "../../global/types";

type ChessBoardCellProps = {
  type: Color;
  cordinate: {
    file: number;
    rank: number;
  };
  displayRank?: boolean;
  displayFile?: boolean;
  highlight?: "none" | "red" | "yellow" | "blue";
  peice?: Piece;
  onClick: (file: number, rank: number) => void;
};

const pieceImageSources = new Map<number | null, string | undefined>([
  [null, undefined],
  [W_P, pawn_w],
  [W_N, knight_w],
  [W_K, king_w],
  [W_Q, queen_w],
  [W_R, rook_w],
  [W_B, bishop_w],
  [B_P, pawn_b],
  [B_N, knight_b],
  [B_K, king_b],
  [B_Q, queen_b],
  [B_R, rook_b],
  [B_B, bishop_b],
]);

console.log(pieceImageSources.get(0));

const ChessBoardCell = ({
  type,
  cordinate,
  displayFile = false,
  displayRank = false,
  highlight = "none",
  peice = null,
  onClick,
}: ChessBoardCellProps) => {
  const cellClasses: string = `${styles.cell} ${
    type === BLACK ? styles.dark : styles.light
  }`;

  let highlightCLasses = "";
  if (highlight === "blue") {
    highlightCLasses = `${styles.highlight} ${styles.blue}`;
  } else if (highlight === "red") {
    highlightCLasses = `${styles.highlight} ${styles.red}`;
  } else if (highlight === "yellow") {
    highlightCLasses = `${styles.highlight} ${styles.yellow}`;
  }

  const rank: string = displayRank ? `${1 + cordinate.rank}` : "";
  const file: string = displayFile
    ? String.fromCharCode(97 + cordinate.file)
    : "";

  return (
    <div
      className={cellClasses}
      onClick={() => onClick(cordinate.file, cordinate.rank)}
    >
      <div className={styles.cellTextContainer}>
        <span className={styles.cellRankText}>{rank}</span>
        <span className={styles.cellFileText}>{file}</span>
      </div>
      {peice !== null && <img src={pieceImageSources.get(peice)} alt="bish" />}
      {highlight !== "none" && <div className={highlightCLasses}></div>}
    </div>
  );
};

export default ChessBoardCell;
