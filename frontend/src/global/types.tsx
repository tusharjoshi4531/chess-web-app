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

export type Square = {
  file: number;
  rank: number;
};
