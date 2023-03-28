export interface IChallengeData {
    white: string;
    black: string;
    from: string;
    to: string;
}

export interface IGameData extends IChallengeData {
    boardState: string;
}

export interface IGameState {
    oponent: string;
    color: 0 | 1;
    boardState: string;
    roomId: string;
}

export enum GAME_STATE_ACTION_TYPE {
    SET_STATE,
    CLEAR_STATE,
    UPDATE_BOARD,
}

export interface IGameStateReducerAction {
    type: GAME_STATE_ACTION_TYPE;
    payload?: IGameState | string;
}

export const initialGameState: IGameState = {
    oponent: "",
    boardState: "",
    color: 1,
    roomId: "",
};

export const startGameState =
    "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export type GameFinishStatus =
    | "resign"
    | "threefolds"
    | "insuffecient material"
    | "checkmate"
    | "stalemate";

export interface IGameFinish {
    roomId: string;
    winner: 0 | 1 | 2;
    type: GameFinishStatus;
}

export interface IGameResult {
    winner: 0 | 1 | 2;
    message: string;
}
