import { useRef, useState } from "react";
import FormLayout from "./FormLayout";

import styles from "./MainPageForm.module.css";

const MainPageForm = () => {
    // Refs
    const usernameInputRef = useRef<HTMLInputElement>(null!);
    const emailInputRef = useRef<HTMLInputElement>(null!);

    // hooks
    const [chosenWhite, setChosenWhite] = useState<boolean>(true);

    const usernameInputBlurHandler = () =>
        (emailInputRef.current.disabled = !!usernameInputRef.current.value);

    const emailInputBlurHandler = () =>
        (usernameInputRef.current.disabled = !!emailInputRef.current.value);

    const selectedButtonClasses = `${styles.colorSelectorButton} ${styles.selectdColorSelectorButton}`;
    const unselectedButtonClasses = `${styles.colorSelectorButton}`;

    return (
        <FormLayout
            title="Challenge"
            control={
                <>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder="Username"
                        ref={usernameInputRef}
                        onBlur={usernameInputBlurHandler}
                    />
                    <label>Email</label>
                    <input
                        type="text"
                        placeholder="UserEmail"
                        ref={emailInputRef}
                        onBlur={emailInputBlurHandler}
                    />
                    <label>Color</label>
                    <div className={styles.colorSelectorContainer}>
                        <button
                            className={
                                chosenWhite
                                    ? selectedButtonClasses
                                    : unselectedButtonClasses
                            }
                            onClick={() => setChosenWhite(true)}
                        >
                            White
                        </button>
                        <button
                            className={
                                !chosenWhite
                                    ? selectedButtonClasses
                                    : unselectedButtonClasses
                            }
                            onClick={() => setChosenWhite(false)}
                        >
                            Black
                        </button>
                    </div>
                </>
            }
            actions={
                <>
                    <button type="submit">Submit</button>
                </>
            }
            style={{
                width: "50%",
                margin: "32px auto",
            }}
        />
    );
};

export default MainPageForm;
