import { createContext, useState } from "react";

type UserContextData = {
    username: string;
    email: string;
    userId: string;
    token: string;
    updateUserInfo: (username: string, email:string, user_id: string, token: string) => void;
};

export const UserContext = createContext<UserContextData>({
    username: "",
    email: "",
    userId: "",
    token: "",
    updateUserInfo: () => {},
});

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");

    const updateUserInfo = (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => {
        setUsername(username);
        setEmail(email);
        setUserId(user_id);
        setToken(token);
    };

    const value: UserContextData = { username, userId, token, email, updateUserInfo };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
