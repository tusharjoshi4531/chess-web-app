import { useEffect, useRef } from "react";
import { io, ManagerOptions, SocketOptions } from "socket.io-client";
import { IChallengeData, IGameState } from "../store/game/types";
import {
    IUseSocketValue,
    SocketSendChallenge,
    SocketConnect,
    SocketDisconnect,
    SocketSubscribeChallengeReceive,
    SocketUnsubscribeChallengeReceive,
    SocketUnsubscribeChallengeCreated,
    SocketSubscribeChallengeCreated,
} from "./Types";

export const useSocket = (
    url: string,
    opts?: Partial<ManagerOptions & SocketOptions> | undefined
): IUseSocketValue => {
    const socketRef = useRef(io(url, opts));

    const connect: SocketConnect = (data, callback) => {
        socketRef.current.connect();
        socketRef.current.emit("connect-user", data, callback);
    };

    const disconnect: SocketDisconnect = () => {
        socketRef.current.close();
    };

    const sendChallenge: SocketSendChallenge = (data, callback) => {
        socketRef.current.emit("challenge-sent", data, callback);
    };

    const subscribeChallengeReceive: SocketSubscribeChallengeReceive = (
        callback
    ) => {
        socketRef.current.on("challenge-receive", (data: IChallengeData) => {
            callback(data);
        });
    };

    const unsubscribeChallengeReceive: SocketUnsubscribeChallengeReceive =
        () => {
            socketRef.current.removeListener("challenge-receive");
        };

    const subscribeChallengeCreated: SocketSubscribeChallengeCreated = (
        callback
    ) => {
        socketRef.current.on("challenge-created", (data: IGameState) => {
            callback(data);
        });
    };

    const unsubscribeChallengeCreated: SocketUnsubscribeChallengeCreated =
        () => {
            socketRef.current.removeListener("challenge-created");
        };

    useEffect(
        () => () => {
            if (socketRef.current) disconnect();
        },
        []
    );

    return {
        obj: socketRef.current,
        connect,
        disconnect,
        sendChallenge,
        subscribeChallengeReceive,
        unsubscribeChallengeReceive,
        subscribeChallengeCreated,
        unsubscribeChallengeCreated,
    };
};
