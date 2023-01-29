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

export interface IChallenge {
    creatorId: string;
    creator: string;
    name: string;
    creatorColor: "Black" | "Any" | "White";
    timeControl: TimeControl;
}

export interface IChallengeSchema extends IChallenge {
    status: "pending" | "ongoing" | "finished";
}
