import { BoardChange, BoardState, Square } from "../global/types";

export const updateBoard = (
  currentSquare: Square,
  chosenSquare: Square,
  state: BoardState,
  changes: BoardChange[],
  callBack: () => void = () => {}
) => {
  if (chosenSquare === null) return state;

  const { file, rank } = currentSquare;

  changes.push([
    rank * 10 + file,
    state[rank][file],
    state[chosenSquare.rank][chosenSquare.file],
  ]);
  state[rank][file] = state[chosenSquare.rank][chosenSquare.file];

  changes.push([
    chosenSquare.rank * 10 + chosenSquare.file,
    state[chosenSquare.rank][chosenSquare.file],
    null,
  ]);
  state[chosenSquare.rank][chosenSquare.file] = null;

  callBack();

  return state;
};
