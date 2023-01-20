import { BLACK, BoardState, Color, Piece, Square, WHITE } from '../global/types'

export const getColor = (piece: Piece): Color | null => {
  if (piece === null) return null;
  if (piece < 6) return WHITE;
  else return BLACK;
};

export const checkPawn = (boardState: BoardState, color: Color, cordinate: Square, chosenSquare: Square, enPassentSquare: Square | null) => {
  const dir = 1 - 2 * color;
  const startingRank = color === WHITE ? 1 : 6;

  if (chosenSquare === null) return false;

  if (
    enPassentSquare !== null &&
    cordinate.file === enPassentSquare.file &&
    cordinate.rank === enPassentSquare.rank
  ) {
    return true;
  }

  if (
    cordinate.file === chosenSquare.file &&
    cordinate.rank === chosenSquare.rank + 1 * dir &&
    boardState[cordinate.rank][cordinate.file] === null
  ) {
    return true;
  }

  if (
    cordinate.file === chosenSquare.file &&
    chosenSquare.rank === startingRank &&
    cordinate.rank === startingRank + 2 * dir &&
    boardState[cordinate.rank][cordinate.file] === null
  ) {
    return true;
  }

  if (
    cordinate.rank === chosenSquare.rank + 1 * dir &&
    (cordinate.file === chosenSquare.file + 1 ||
      cordinate.file === chosenSquare.file - 1) &&
    getColor(boardState[cordinate.rank][cordinate.file]) === (1 ^ color)
  ) {
    return true;
  }
  return false;
};

export const checkBishop = (boardState: BoardState, cordinate: Square, chosenSquare: Square) => {
  if (chosenSquare === null) return false;

  let dirFile = Math.abs(cordinate.file - chosenSquare.file);
  let dirRank = Math.abs(cordinate.rank - chosenSquare.rank);

  if (dirFile !== dirRank) return false;

  dirFile = Math.sign(cordinate.file - chosenSquare.file);
  dirRank = Math.sign(cordinate.rank - chosenSquare.rank);

  let file = chosenSquare.file + dirFile;
  let rank = chosenSquare.rank + dirRank;

  while (file !== cordinate.file && rank !== cordinate.rank) {
    if (boardState[rank][file] !== null) {
      return false;
    }
    file += dirFile;
    rank += dirRank;
  }

  return true;
};

export const checkKnight = (cordinate: Square, chosenSquare: Square) => {
  if (chosenSquare === null) return false;

  const len = Math.max(
    Math.abs(cordinate.file - chosenSquare.file),
    Math.abs(cordinate.rank - chosenSquare.rank)
  );
  const wid = Math.min(
    Math.abs(cordinate.rank - chosenSquare.rank),
    Math.abs(cordinate.file - chosenSquare.file)
  );

  console.log({ len, wid });

  if (len !== 2 || wid !== 1) {
    return false;
  } else {
    return true;
  }
};

export const checkRook = (boardState: BoardState, cordinate: Square, chosenSquare: Square) => {
  if (chosenSquare === null) return false;

  const dirFile = Math.sign(cordinate.file - chosenSquare.file);
  const dirRank = Math.sign(cordinate.rank - chosenSquare.rank);

  if (dirFile !== 0 && dirRank !== 0) return false;

  if (dirFile !== 0) {
    let file = chosenSquare.file + dirFile;
    while (file !== cordinate.file) {
      if (boardState[chosenSquare.rank][file] !== null) return false;
      file += dirFile;
    }
  }

  if (dirRank !== 0) {
    let rank = chosenSquare.rank + dirRank;
    while (rank !== cordinate.rank) {
      if (boardState[rank][chosenSquare.file] !== null) return false;
      rank += dirRank;
    }
  }

  return true;
};

export const checkQueen = (boardState: BoardState, cordinate: Square, chosenSquare: Square) => {
  return checkBishop(boardState, cordinate, chosenSquare) || checkRook(boardState, cordinate, chosenSquare);
};

export const checkKing = (boardState: BoardState, cordinate: Square, chosenSquare: Square) => {
  if (chosenSquare === null) return false;

  return (
    Math.abs(cordinate.file - chosenSquare.file) <= 1 &&
    Math.abs(cordinate.rank - chosenSquare.rank) <= 1
  );
};