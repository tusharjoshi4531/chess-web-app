export const W_P = 0;
export const W_R = 1;
export const W_N = 2;
export const W_B = 3;
export const W_Q = 4;
export const W_K = 5;
export const B_P = 6;
export const B_R = 7;
export const B_N = 8;
export const B_B = 9;
export const B_Q = 10;
export const B_K = 11;
export const WHITE = 0;
export const BLACK = 1;

export type Piece = null | 0 | 1 | 3 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type Color = 0 | 1;

export type BoardState = Piece[][];

export type Square = {
  file: number;
  rank: number;
};
