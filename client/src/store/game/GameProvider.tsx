import { Chess } from "chess.js";
import React, {
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import { useNavigate } from "react-router";
import Modal from "../../components/modal/Modal";
import UserContext from "../user/user-context";
import GameContext from "./game-context";
import {
    GAME_STATE_ACTION_TYPE,
    IChallengeData,
    IGameResult,
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

        case GAME_STATE_ACTION_TYPE.CLEAR_STATE:
            return { ...initialGameState };

        default:
            return state;
    }
};

const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const gameRef = useRef(new Chess());
    const [gameData, dispatch] = useReducer(reducer, { ...initialGameState });

    const navigate = useNavigate();

    const [modalComponent, setModalComponent] =
        useState<React.ReactNode | undefined>(undefined);

    const { socket, userId, username } = useContext(UserContext);

    const challengeReceiveModalConfirmHandler = (data: IChallengeData) => {
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
                onSubmit={() => challengeReceiveModalConfirmHandler(data)}
                onCancel={() => setModalComponent(undefined)}
                cancel={true}
            />
        );
    };

    const moveMadeHandler = (data: { boardState: string }) => {
        dispatch({
            type: GAME_STATE_ACTION_TYPE.UPDATE_BOARD,
            payload: data.boardState,
        });

        gameRef.current.load(data.boardState);
    };

    const gameFinishModalConfirmHandler = (data: IGameResult) => {
        dispatch({ type: GAME_STATE_ACTION_TYPE.CLEAR_STATE });
        setModalComponent(undefined);

        socket.unsubscribeMoveMade();
        socket.unsubscribeGameFinish();

        socket.subscribeChallengeReceive(challengeReceiveHandler);
        socket.subscribeChallengeCreated((data) => setChallenge(data));
    };

    const gameFinishHandler = (data: IGameResult) => {
        console.log(data);
        console.log(gameData);

        let title: string;

        if (data.winner === 2) title = "Its a Draw!!!";
        else if (data.winner === 0) title = "White Wins!!!";
        else title = "Black Wins!!!";

        setModalComponent(
            <Modal
                title={title}
                content={data.message}
                cancel={false}
                onSubmit={() => gameFinishModalConfirmHandler(data)}
            />
        );
    };

    const setChallenge = (data: IGameState) => {
        dispatch({ type: GAME_STATE_ACTION_TYPE.SET_STATE, payload: data });
        gameRef.current.load(data.boardState);
        socket.subscribeMoveMade(moveMadeHandler);
        socket.subscribeGameFinish(gameFinishHandler);

        socket.unsubscribeChallengeReceive();
        socket.unsubscribeChallengeCreated();

        navigate("/game");
    };

    useEffect(() => {
        if (!socket.obj) return;
        if (userId != "") {
            console.log("t");
            socket.subscribeChallengeReceive(challengeReceiveHandler);
            socket.subscribeChallengeCreated((data) => setChallenge(data));

            socket.obj.emit(
                "check-user-in-game",
                { username },
                (data: IGameState | undefined) => {
                    if (!data) return;

                    setChallenge(data);
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
