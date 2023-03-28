

export interface IUserData {
    token: string;
    username: string;
    userId: string;
    email: string;
}

export const enum USER_ACTION_TYPE {
    UPDATE_USER,
    CLEAR_USER,
}

export interface IReducerAction {
    type: USER_ACTION_TYPE;
    payload?: IUserData;
}

