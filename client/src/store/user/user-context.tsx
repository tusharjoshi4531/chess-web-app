import { createContext } from "react";
import { IReducerAction, IUserData } from "./types";

export const initialState: IUserData = {
    token: "",
    userId: "",
    username: "",
    email: "",
};

interface IUserContext extends IUserData {
    dispatch: React.Dispatch<IReducerAction>;
}

const UserContext = createContext<IUserContext>({
    ...initialState,
    dispatch: () => {},
});

export default UserContext;
