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

export const startGameState = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
