import { io } from "socket.io-client";
import { useCallback, useEffect, useRef } from "react";
import { ManagerOptions, SocketOptions } from "socket.io-client";
import {
    IChallengeSocketData,
    Move,
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

    const connect: SocketConnectFunction = useCallback(
        (onChallengeReceived, onChallengeCreated, onMoveMade) => {
            socketRef.current.connect();

            socketRef.current.on("challenge", (data: IChallengeSocketData) => {
                onChallengeReceived(data);
            });

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
        },
        [socketRef]
    );

    return {
        socket: socketRef.current,
        connect,
    };
};
