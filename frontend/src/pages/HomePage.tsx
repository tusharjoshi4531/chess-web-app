import { useContext, useRef, useState } from "react";
import FormLayout from "../components/layout/FormLayout";
import HomePageLayout from "../components/layout/HomePageLayout";
import ButtonGroup from "../components/ui/ButtonGroup";
import InputGroup from "../components/ui/InputGroup";
import { UserContext } from "../store/user-context";

const HomePage = () => {
    const { userId } = useContext(UserContext);

    const challengeNameInputRef = useRef<HTMLInputElement>(null);
    const timeInputRef = useRef<HTMLInputElement>(null);
    const incrementInputRef = useRef<HTMLInputElement>(null);

    const [selectedColor, setSelectedColor] = useState<undefined | string>();

    const colorSelectHandler = (selected: string) => {
        setSelectedColor(selected);
    };

    const formSubmitHandler = () => {
        const challengeName = challengeNameInputRef.current?.value;
        const time = timeInputRef.current?.value;
        const increment = incrementInputRef.current?.value;

        console.log({ challengeName, time, increment, selectedColor });
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
                            <ButtonGroup
                                buttonsInfo={[
                                    {
                                        text: "Black",
                                    },
                                    {
                                        text: "Any",
                                    },
                                    {
                                        text: "White",
                                    },
                                ]}
                                onSelect={colorSelectHandler}
                            />
                        </>
                    }
                    actions={<button type="submit" onClick={formSubmitHandler}>Create</button>}
                    style={createChallengeFormStyles}
                />
            }
            challenges={"challanges"}
        />
    );
};

export default HomePage;
