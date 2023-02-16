import { io } from "socket.io-client";
import { useCallback, useEffect, useRef } from "react";
import { ManagerOptions, SocketOptions } from "socket.io-client";
import {
    ChallengeCreatedEvent,
    ChallengeReceiveEvent,
    IChallengeSocketData,
    Move,
    MoveMadeEvent,
    SocketConnectFunction,
} from "../global/types";

export const useSocket = (
    url: string,
    opts?: Partial<ManagerOptions & SocketOptions> | undefined
) => {
    const socketRef = useRef(io(url, opts));

    useEffect(
        () => () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        },
        []
    );

    const connect = () => {
        socketRef.current.connect();
    };

    const addChallengeReceivedEvent = (
        onChallengeReceived: ChallengeReceiveEvent
    ) => {
        socketRef.current.on("challenge", (data: IChallengeSocketData) => {
            onChallengeReceived(data);
        });
    };

    const addChallengeCreatedEvent = (
        onChallengeCreated: ChallengeCreatedEvent
    ) => {
        socketRef.current.on(
            "challenge-created",
            ({
                roomName,
                data,
            }: {
                roomName: string;
                data: IChallengeSocketData;
            }) => {
                onChallengeCreated(roomName, data);
            }
        );
    };

    const addMoveMadeEvent = (onMoveMade: MoveMadeEvent) => {
        socketRef.current.on(
            "move-made",
            ({
                moves,
                displayMoves,
            }: {
                moves: Move[];
                displayMoves: string[];
            }) => {
                onMoveMade(moves, displayMoves);
            }
        );
    };

    return {
        socket: socketRef.current,
        connect,
        methods : {
            addChallengeCreatedEvent,
            addChallengeReceivedEvent,
            addMoveMadeEvent,
        },
    };
};
