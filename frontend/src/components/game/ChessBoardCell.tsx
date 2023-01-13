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
import { Piece } from "../../global/InitialBoardState";

type ChessBoardCellProps = {
  type: "light" | "dark";
  cordinate: {
    file: number;
    rank: number;
  };
  displayRank?: boolean;
  displayFile?: boolean;
  highlight?: "none" | "red" | "yellow" | "blue";
  peice?: Piece
};

const peiceImageSources = {
  "none": null,
  "white-pawn": pawn_w,
  "white-king": king_w,
  "white-queen": queen_w,
  "white-rook": rook_w,
  "white-knight": knight_w,
  "white-bishop": bishop_w,
  "black-pawn": pawn_b,
  "black-king": king_b,
  "black-queen": queen_b,
  "black-rook": rook_b,
  "black-knight": knight_b,
  "black-bishop": bishop_b,
};

const ChessBoardCell = ({
  type,
  cordinate,
  displayFile = false,
  displayRank = false,
  highlight = "none",
  peice = "none",
}: ChessBoardCellProps) => {
  const cellClasses: string = `${styles.cell} ${
    type === "dark" ? styles.dark : styles.light
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
    <div className={cellClasses}>
      <div className={styles.cellTextContainer}>
        <span className={styles.cellRankText}>{rank}</span>
        <span className={styles.cellFileText}>{file}</span>
      </div>
      {peice !== "none" && <img src={peiceImageSources[peice]} alt="bish" />}
      {highlight !== "none" && <div className={highlightCLasses}></div>}
    </div>
  );
};

export default ChessBoardCell;
