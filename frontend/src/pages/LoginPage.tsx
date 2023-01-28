import { useRef } from "react";
import FormLayout from "../components/layout/FormLayout";
import { login } from "../helper/user-auth";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const formLayoutStyles: React.CSSProperties = {
        maxWidth: "400px",
        margin: "auto",
    };

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const loginSuccessHandler = (
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

    const loginErrorHandler = (message: string) => {
        alert(message);
    };

    const formSubmitHandler = () => {
        const email = emailInputRef.current?.value;
        const password = passwordInputRef.current?.value;

        login(email!, password!, loginSuccessHandler, loginErrorHandler);
    };

    const formContent = (
        <>
            <label>Email:</label>
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
                Login
            </button>
            <button>back</button>
        </>
    );

    return (
        <div className={styles.container}>
            <FormLayout
                title="Login"
                content={formContent}
                actions={formActions}
                style={formLayoutStyles}
            />
        </div>
    );
};

export default LoginPage;
