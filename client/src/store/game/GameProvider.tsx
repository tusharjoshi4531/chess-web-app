import { Chess } from "chess.js";
import React, {
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import Modal from "../../components/modal/Modal";
import UserContext from "../user/user-context";
import GameContext from "./game-context";
import {
    GAME_STATE_ACTION_TYPE,
    IChallengeData,
    IGameState,
    IGameStateReducerAction,
    initialGameState,
    startGameState,
} from "./types";

interface GameProviderProps {
    children: React.ReactNode;
}

const reducer = (state: IGameState, action: IGameStateReducerAction) => {
    switch (action.type) {
        case GAME_STATE_ACTION_TYPE.SET_STATE:
            return action.payload as IGameState;

        case GAME_STATE_ACTION_TYPE.UPDATE_BOARD:
            return { ...state, boardState: action.payload as string };
    }
};

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const gameRef = useRef(new Chess());
    const [gameData, dispatch] = useReducer(reducer, { ...initialGameState });

    const [modalComponent, setModalComponent] =
        useState<React.ReactNode | undefined>(undefined);

    const { socket, userId, username } = useContext(UserContext);

    const modalConfirmHandler = (data: IChallengeData) => {
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
        dispatch({ type: GAME_STATE_ACTION_TYPE.SET_STATE, payload: data });
    };

    const moveMadeHandler = (data: { boardState: string }) => {
        dispatch({
            type: GAME_STATE_ACTION_TYPE.UPDATE_BOARD,
            payload: data.boardState,
        });

        gameRef.current.load(data.boardState);
    };

    useEffect(() => {
        if (!socket.obj) return;
        if (userId != "") {
            console.log("t");
            socket.subscribeChallengeReceive(challengeReceiveHandler);
            socket.subscribeChallengeCreated(challengeCreatedHandler);
            socket.subscribeMoveMade(moveMadeHandler);

            socket.obj.emit(
                "check-user-in-game",
                { username },
                (data: IGameState | undefined) => {
                    if (!data) return;

                    dispatch({
                        type: GAME_STATE_ACTION_TYPE.SET_STATE,
                        payload: data,
                    });

                    gameRef.current.load(data.boardState);
                }
            );
        } else {
            socket.unsubscribeChallengeReceive();
            socket.unsubscribeChallengeCreated();
            socket.unsubscribeMoveMade();
        }
    }, [userId]);

    return (
        <GameContext.Provider
            value={{ game: gameRef.current, gameData, dispatch }}
        >
            {children}
            {modalComponent}
        </GameContext.Provider>
    );
};

export default GameProvider;
