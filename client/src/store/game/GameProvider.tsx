import { Chess } from "chess.js";
import React, { useContext, useEffect, useRef, useState } from "react";
import Modal from "../../components/modal/Modal";
import UserContext from "../user/user-context";
import GameContext from "./game-context";
import { IChallengeData, IGameState, startGameState } from "./types";

interface GameProviderProps {
    children: React.ReactNode;
}

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const gameRef = useRef(new Chess());
    const [gameData, setGameData] = useState<IGameState | undefined>(undefined);

    const [modalComponent, setModalComponent] =
        useState<React.ReactNode | undefined>(undefined);

    const { socket, userId } = useContext(UserContext);

    const modalConfirmHandler = (data: IChallengeData) => {
        // setGameData({ ...data, boardState: startGameState });
        setModalComponent(undefined);

        socket.obj.emit("challenge-accepted", {
            ...data,
            boardState: startGameState,
        });
    };

    const challengeReceiveHandler = (data: IChallengeData) => {
        const { from } = data;
        console.log(data);

        setModalComponent(
            <Modal
                title="You Have Received a Challenge!!!"
                content={`${from} has challenged you`}
                onSubmit={() => modalConfirmHandler(data)}
                onCancel={() => setModalComponent(undefined)}
            />
        );
    };

    const challengeCreatedHandler = (data: IGameState) => {
        setGameData(data);
    };

    useEffect(() => {
        if (userId != "") {
            console.log("t");
            socket.subscribeChallengeReceive(challengeReceiveHandler);
            socket.subscribeChallengeCreated(challengeCreatedHandler);
        } else {
            socket.unsubscribeChallengeReceive();
            socket.unsubscribeChallengeCreated();
        }
    }, [userId]);

    return (
        <GameContext.Provider value={{ game: gameRef.current, gameData }}>
            {children}
            {modalComponent}
        </GameContext.Provider>
    );
};

export default GameProvider;
