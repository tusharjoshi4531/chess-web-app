import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "../global/strings";
import { IChallengeSocketData } from "../global/types";
import { useNavigate } from "react-router";

interface IChallengeContextData extends IChallengeSocketData {
    accepted: boolean;
}

type UserContextData = {
    username: string;
    email: string;
    userId: string;
    token: string;
    socket: Socket | undefined;
    challengeData: IChallengeContextData | undefined;
    roomId: string;
    updateUserInfo: (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => void;
    setChallengeData: React.Dispatch<
        React.SetStateAction<IChallengeContextData | undefined>
    >;
};

export const UserContext = createContext<UserContextData>({
    username: "",
    email: "",
    userId: "",
    token: "",
    socket: undefined,
    challengeData: undefined,
    roomId: "",
    updateUserInfo: () => {},
    setChallengeData: () => {},
});

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [challengeData, setChallengeData] =
        useState<IChallengeContextData | undefined>();
    const [roomId, setRoomId] = useState("");

    const [socketState, setSocketState] = useState<Socket>();

    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(SERVER_URL, {
            autoConnect: false,
        });
        socket.connect();

        socket.on("challenge", (data: IChallengeSocketData) => {
            setChallengeData({ ...data, accepted: false });
        });

        socket.on(
            "challenge-created",
            ({
                roomName,
                data,
            }: {
                roomName: string;
                data: IChallengeSocketData;
            }) => {
                alert("challenge Created");
                setRoomId(roomName);

                console.log(data);

                setChallengeData({ ...data, accepted: true });
            }
        );

        setSocketState(socket);

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    useEffect(() => {
        if (roomId !== "") {
            navigate("/Game");
        }
    }, [roomId, navigate]);

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
        challengeData,
        roomId,
        token,
        email,
        socket: socketState,
        updateUserInfo,
        setChallengeData,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
