import { BoardState, Move } from "../global/types";

export const moveBack = (
  targetMoveNumber: number,
  currentMoveNumber: number,
  state: BoardState,
  moves: Move[],
): BoardState => {
  while (currentMoveNumber !== targetMoveNumber) {
    currentMoveNumber -= 1;
    const currentMove = moves[currentMoveNumber];
    console.log(currentMove);

    currentMove.forEach((change) => {
      const rank = Math.floor(change[0] / 10);
      const file = change[0] % 10;

      state[rank][file] = change[1];
    });
  }
  return state;
};

export const moveForward = (
  targetMoveNumber: number,
  currentMoveNumber: number,
  state: BoardState,
  moves: Move[],
): BoardState => {
  while (currentMoveNumber !== targetMoveNumber) {
    const currentMove = moves[currentMoveNumber];
    console.log(currentMove);

    currentMove.forEach((change) => {
      const rank = Math.floor(change[0] / 10);
      const file = change[0] % 10;

      state[rank][file] = change[2];
    });
    currentMoveNumber += 1;
  }
  return state;
};