import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../global/strings";

type UserContextData = {
    username: string;
    email: string;
    userId: string;
    token: string;
    socket: Socket | undefined;
    updateUserInfo: (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => void;
};

export const UserContext = createContext<UserContextData>({
    username: "",
    email: "",
    userId: "",
    token: "",
    socket: undefined,
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

    const [socketState, setSocketState] = useState<Socket>();

    useEffect(() => {
        const socket = io(SERVER_URL, {
            autoConnect: false,
        });
        socket.connect();
        
        socket.on("challenge-accepted", (roomId: string) => {
            socket.emit("challenge-accepted-repy", roomId);
        })

        setSocketState(socket);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

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

    const value: UserContextData = {
        username,
        userId,
        token,
        email,
        socket: socketState,
        updateUserInfo,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
