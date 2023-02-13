import { Request } from "express";

export type User = {
    username: string;
    email: string;
    password: string;
};

export type SignInUser = {
    email: string;
    password: string;
};

export type TimeControl = {
    time: number;
    increment: number;
};

export type Challenge = {
    id: string;
    username: string;
    name: string;
    creatorColor: "Black" | "Any" | "White";
    timeControl: TimeControl;
};

export type ChallengeSchema = {
    creatorId: string;
    creator: string;
    name: string;
    creatorColor: "Black" | "Any" | "White";
    timeControl: TimeControl;
    status: "pending" | "ongoing" | "finished";
};

export type ChallengeData = {
    challengeId: string;
    id: string;
    username: string;
    name: string;
    creatorColor: "Black" | "Any" | "White";
    timeControl: TimeControl;
};

export type ChallengeSocketData = {
    black: string;
    white: string;
    challenger: string;
    challengee: string;
    isAny: boolean;
    timeControl: TimeControl;
};

export interface IAuthToken {
    username: string;
    email: string;
    id: string;
}

export type Piece = null | 0 | 1 | 3 | 2 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
export type BoardChange = [number, Piece, Piece];
export type Move = BoardChange[];
export type MoveMadeData = {
    moves: Move[];
    displayMoves: string[];
    color: string;
    room: string;
};

export const TEMP_SECRET_KEY = "abc";