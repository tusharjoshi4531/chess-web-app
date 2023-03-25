import { useEffect, useReducer } from "react";
import UserContext, { initialState } from "./user-context";
import { IReducerAction, IUserData, USER_ACTION_TYPE } from "./types";
import {
    getUserDataFromLocalStorage,
    saveUserDataToLocalStorage,
} from "../../helper/local-storage";

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

    useEffect(() => {
        dispatch({
            type: USER_ACTION_TYPE.UPDATE_USER,
            payload: getUserDataFromLocalStorage(),
        });
    }, []);

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
