import { createContext } from "react";

export interface IUserData {
    token: string;
    username: string;
    userId: string;
}

export const initialState: IUserData = {
    token: "",
    userId: "",
    username: "",
};

export const enum USER_ACTION_TYPE {
    UPDATE_USER,
}

export interface IReducerAction {
    type: USER_ACTION_TYPE;
}

interface IUserContext extends IUserData {
    dispatch: React.Dispatch<IReducerAction>;
}

const UserContext = createContext<IUserContext>({
    ...initialState,
    dispatch: () => {},
});

export default UserContext;
