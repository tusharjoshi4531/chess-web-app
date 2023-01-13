export type Piece =
  | "none"
  | "white-pawn"
  | "white-rook"
  | "white-queen"
  | "white-bishop"
  | "white-knight"
  | "white-king"
  | "black-pawn"
  | "black-rook"
  | "black-queen"
  | "black-bishop"
  | "black-knight"
  | "black-king";

export type BoardState = Piece[][];

export const initialBoardState: BoardState = [
  [
    "white-rook",
    "white-knight",
    "white-bishop",
    "white-king",
    "white-queen",
    "white-bishop",
    "white-knight",
    "white-rook",
  ],
  [
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
    "white-pawn",
  ],
  ["none", "none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none", "none"],
  ["none", "none", "none", "none", "none", "none", "none", "none"],
  [
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
    "black-pawn",
  ],
  [
    "black-rook",
    "black-knight",
    "black-bishop",
    "black-king",
    "black-queen",
    "black-bishop",
    "black-knight",
    "black-rook",
  ],
];
