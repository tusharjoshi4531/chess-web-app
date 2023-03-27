import { useEffect, useReducer } from "react";
import UserContext, { initialState } from "./user-context";
import { IReducerAction, IUserData, USER_ACTION_TYPE } from "./types";
import {
    getUserDataFromLocalStorage,
    saveUserDataToLocalStorage,
} from "../../helper/local-storage";
import { useSocket } from "../../hooks/use-socket";
import { SERVER_URL } from "../../api/Util";

interface UserProviderProps {
    children: React.ReactNode;
}

const reducer = (state: IUserData, action: IReducerAction): IUserData => {
    switch (action.type) {
        case USER_ACTION_TYPE.UPDATE_USER:
            return action.payload != undefined
                ? saveUserDataToLocalStorage(action.payload)
                : state;

        case USER_ACTION_TYPE.CLEAR_USER:
            return { email: "", token: "", userId: "", username: "" };

        default:
            return state;
    }
};

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const socket = useSocket(SERVER_URL, {
        autoConnect: false,
    });

    useEffect(() => {
        const savedUserData = getUserDataFromLocalStorage();

        if (savedUserData.userId == "") return;

        socket.connect(
            {
                userId: savedUserData.userId,
                username: savedUserData.username,
                email: savedUserData.email,
            },
            (status) => {
                if (status)
                    dispatch({
                        type: USER_ACTION_TYPE.UPDATE_USER,
                        payload: savedUserData,
                    });
            }
        );
    }, []);

    return (
        <UserContext.Provider value={{ ...state, dispatch, socket }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
