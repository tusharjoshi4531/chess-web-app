import { useContext, useEffect, useRef, useState, useCallback } from "react";
import ChallengesLayout from "../components/layout/ChallengesLayout";
import FormLayout from "../components/layout/FormLayout";
import HomePageLayout from "../components/layout/HomePageLayout";
import ButtonGroup from "../components/ui/ButtonGroup";
import InputGroup from "../components/ui/InputGroup";
import {
    ChallengeRequestCallback,
    ChallengeRequestData as ChallengeData,
    RequestErrorCallback,
    SelectedColor,
} from "../global/types";
import { addChallenge, getChallenges } from "../helper/challenge-api";
import { UserContext } from "../store/user-context";

const HomePage = () => {
    const { userId, username, token } = useContext(UserContext);

    const challengeNameInputRef = useRef<HTMLInputElement>(null!);
    const timeInputRef = useRef<HTMLInputElement>(null!);
    const incrementInputRef = useRef<HTMLInputElement>(null!);

    const [challenges, setChallenges] = useState<ChallengeData[]>([]);

    const [selectedColor, setSelectedColor] =
        useState<SelectedColor | undefined>();

    const colorSelectHandler = (selected: SelectedColor) => {
        setSelectedColor(selected);
    };

    const getChallangesSuccessHandler = useCallback<ChallengeRequestCallback>(
        (challenges) => {
            setChallenges(
                challenges.filter(({ creator }) => creator !== username)
            );
        },
        [username]
    );

    const getChallengesErrorHandler = useCallback<RequestErrorCallback>(
        (message) => {
            alert(message);
        },
        []
    );

    useEffect(() => {
        if (token !== "") {
            getChallenges(
                token,
                getChallangesSuccessHandler,
                getChallengesErrorHandler
            );
        }
    }, [getChallangesSuccessHandler, getChallengesErrorHandler, token]);

    const formSubmitHandler = () => {
        const challengeName = challengeNameInputRef.current.value.trim();
        const time = parseInt(timeInputRef.current.value);
        const increment = parseInt(incrementInputRef.current.value);

        const isValid =
            challengeName &&
            challengeName.length > 5 &&
            !isNaN(time) &&
            !isNaN(increment) &&
            time >= 1 &&
            increment >= 0 &&
            selectedColor;

        if (!isValid) {
            alert("Invalid challenge details");
            return;
        }

        console.log(userId, username, challengeName, selectedColor, increment);

        addChallenge(token, challengeName, selectedColor!, {
            time,
            increment,
        })
            .then((res) => {
                alert(res);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    if (userId === "") {
        return (
            <h1 style={{ margin: "200px 0px", textAlign: "center" }}>
                LOGIN TO CONTINUE
            </h1>
        );
    }

    const createChallengeFormStyles: React.CSSProperties = {
        minWidth: "400px",
        margin: "32px auto",
    };

    return (
        <HomePageLayout
            challengeForm={
                <FormLayout
                    title="Create a Challenge"
                    content={
                        <>
                            <label>Name: </label>
                            <input
                                type="text"
                                placeholder="name"
                                ref={challengeNameInputRef}
                            />
                            <label>Time Control: </label>
                            <InputGroup
                                inputs={[
                                    <input
                                        type="number"
                                        placeholder="Time"
                                        key="time"
                                        ref={timeInputRef}
                                    />,
                                    <input
                                        type="number"
                                        placeholder="Inc"
                                        key="increment"
                                        ref={incrementInputRef}
                                    />,
                                ]}
                            />
                            <ButtonGroup<SelectedColor>
                                buttonsInfo={[
                                    {
                                        text: "Black",
                                        val: "Black",
                                    },
                                    {
                                        text: "Any",
                                        val: "Any",
                                    },
                                    {
                                        text: "White",
                                        val: "White",
                                    },
                                ]}
                                onSelect={colorSelectHandler}
                            />
                        </>
                    }
                    actions={
                        <button type="submit" onClick={formSubmitHandler}>
                            Create
                        </button>
                    }
                    style={createChallengeFormStyles}
                />
            }
            challenges={<ChallengesLayout challenges={challenges} />}
        />
    );
};

export default HomePage;
