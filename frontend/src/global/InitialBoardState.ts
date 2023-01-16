import {
  BoardState,
  W_B,
  W_K,
  W_N,
  W_P,
  W_Q,
  W_R,
  B_B,
  B_K,
  B_N,
  B_P,
  B_Q,
  B_R,
} from "./types";

export const initialBoardState: BoardState = [
  [W_R, W_N, W_B, W_K, W_Q, W_B, W_N, W_R],
  [W_P, W_P, W_P, W_P, W_P, W_P, W_P, W_P],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [B_P, B_P, B_P, B_P, B_P, B_P, B_P, B_P],
  [B_R, B_N, B_B, B_K, B_Q, B_B, B_N, B_R],
];
