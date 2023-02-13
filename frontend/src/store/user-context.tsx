import { Socket } from "socket.io-client";
import { createContext, useState } from "react";
import { SERVER_URL } from "../global/strings";
import { IChallengeSocketData, SocketConnectFunction } from "../global/types";
import { useSocket } from "../hooks/socket-hook";

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
    setRoomId: React.Dispatch<React.SetStateAction<string>>;
    connect: SocketConnectFunction,
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
    setRoomId: () => {},
    connect: () => {},
});

type UserProviderProps = {
    children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
    const { socket, connect } = useSocket(SERVER_URL, {
        autoConnect: false,
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [token, setToken] = useState("");
    const [challengeData, setChallengeData] =
        useState<IChallengeContextData | undefined>();
    const [roomId, setRoomId] = useState("");

    // useEffect(() => {
    //     connect(
    //         (data: IChallengeSocketData) => {
    //             setChallengeData({ ...data, accepted: false });
    //         },
    //         (roomName: string, data: IChallengeSocketData) => {
    //             alert("challenge Created");
    //             setRoomId(roomName);

    //             console.log(data);

    //             setChallengeData({ ...data, accepted: true });

    //             navigate("/Game");
    //         }
    //     );
    // }, [navigate, connect]);

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
        socket,
        updateUserInfo,
        setChallengeData,
        setRoomId,
        connect,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
};
