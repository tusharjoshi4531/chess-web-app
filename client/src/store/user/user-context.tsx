import { Socket } from "socket.io-client";
import { createContext } from "react";
import { IReducerAction, IUserData } from "./types";
import { IUseSocketValue } from "../../hooks/Types";

export const initialState: IUserData = {
    token: "",
    userId: "",
    username: "",
    email: "",
};

interface IUserContext extends IUserData {
    dispatch: React.Dispatch<IReducerAction>;
    socket: IUseSocketValue;
}

const UserContext = createContext<IUserContext>({
    ...initialState,
    dispatch: () => {},
    socket: {} as IUseSocketValue,
});

export default UserContext;
