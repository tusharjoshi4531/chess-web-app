import { useRef } from "react";
import FormLayout from "../components/layout/FormLayout";
import { signup } from "../helper/user-auth";

import styles from "./SignupPage.module.css";

const SignupPage = () => {
    const formLayoutStyles: React.CSSProperties = {
        maxWidth: "400px",
        margin: "auto",
    };

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const signupSuccessHandler = (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => {
        console.log({
            username,
            email,
            user_id,
            token,
        });
    };

    const signupErrorHandler = (message: string) => {
        alert(message);
        console.log(message);
    };

    const formSubmitHandler = () => {
        const username = usernameInputRef.current?.value;
        const email = emailInputRef.current?.value;
        const password = passwordInputRef.current?.value;

        const validFormData =
            username &&
            username.trim().length >= 5 &&
            email &&
            email.trim().includes("@") &&
            password &&
            password.trim().length >= 7;

        if (!validFormData) {
            alert("incorrect username");
            return;
        }

        signup(
            email!,
            username!,
            password!,
            signupSuccessHandler,
            signupErrorHandler
        );
    };

    const formContent = (
        <>
            <label>Username:</label>
            <input type="text" placeholder="Username" ref={usernameInputRef} />
            <label>E-mail:</label>
            <input type="email" placeholder="E-mail" ref={emailInputRef} />
            <label>Password:</label>
            <input
                type="password"
                placeholder="Password"
                ref={passwordInputRef}
            />
        </>
    );

    const formActions = (
        <>
            <button type="submit" onClick={formSubmitHandler}>
                Signup
            </button>
            <button>back</button>
        </>
    );

    return (
        <div className={styles.container}>
            <FormLayout
                title="Signup"
                content={formContent}
                actions={formActions}
                style={formLayoutStyles}
            />
        </div>
    );
};

export default SignupPage;
