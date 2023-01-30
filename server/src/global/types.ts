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
}

export type ChallengeSchema = {
    creatorId: string;
    creator: string;
    name: string;
    creatorColor: "Black" | "Any" | "White";
    timeControl: TimeControl;
    status: "pending" | "ongoing" | "finished";
}

export interface IAuthToken {
    username: string;
    email: string;
    id: string;
}

export const TEMP_SECRET_KEY = "abc";
