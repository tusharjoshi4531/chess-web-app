import { useReducer } from "react";
import UserContext, { IUserData, initialState, IReducerAction } from "./user-context";

const reducer = (state: IUserData, action: IReducerAction): IUserData => {
    switch (action) {
        default:
            return state;
    }
};

const UserProvider = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <UserContext.Provider value={{...state, dispatch}}>

    </UserContext.Provider>;
};

export default UserProvider;
