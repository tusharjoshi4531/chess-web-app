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

export type BoardChange = [number, Piece, Piece];

export type Move = BoardChange[];

export type SelectedColor = "Black" | "White" | "Any";

export type UserRequestData = {
    user: {
        username: string;
        email: string;
        password: string;
        _id: string;
        __v: number;
    };
    token: string;
};

export type ChallengeRequestData = {
    _id: string;
    creatorId: string;
    creator: string;
    name: string;
    creatorColor: "Black" | "White" | "Any";
    timeControl: {
        time: number;
        increment: number;
    };
    status: "pending" | "ongoing" | "finished";
};

export type UserRequestCallback = (
    username: string,
    email: string,
    user_id: string,
    token: string
) => void;

export type ChallengeRequestCallback = (
    challenges: ChallengeRequestData[]
) => void;

export type RequestErrorCallback = (message: string) => void;

export type TimeControl = {
    time: number;
    increment: number;
};

export interface IChallengeSocketData {
    black: string;
    white: string;
    challenger: string;
    challengee: string;
    isAny: boolean;
    timeControl: TimeControl;
}

export type UseBoardData = {
    moveNumber: number;
    turn: Color;
    isOnCurrentMove: () => boolean;
    setMoveNumber: React.Dispatch<React.SetStateAction<number>>;
    onChoseSquare: (
        file: number,
        rank: number,
        onMoveFinish?: (
            move: Move,
            prevSquare?: Square | undefined,
            currentSquare?: Square | undefined
        ) => void
    ) => void;
    addMove: (move: Move) => void;
    changeMove: (targetMoveNumber: number) => void;
    goToFirstMove: () => void;
    goToLastMove: () => void;
    setNewMoves: (newMoves: Move[], moveOnce: boolean) => void;
};

export type ChallengeReceiveEvent = (data: IChallengeSocketData) => void;

export type ChallengeCreatedEvent = (
    roomName: string,
    data: IChallengeSocketData
) => void;

export type MoveMadeEvent = (moves: Move[], displayMoves: string[]) => void;

export type SocketConnectFunction = (
    onChallengeReceived: ChallengeReceiveEvent,
    onChallengeCreated: ChallengeCreatedEvent,
    onMoveMade: MoveMadeEvent
) => void;
