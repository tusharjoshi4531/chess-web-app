import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/layout/FormLayout";
import { signup } from "../helper/user-auth";
import { UserContext } from "../store/user-context";

const SignupPage = () => {
    const formLayoutStyles: React.CSSProperties = {
        maxWidth: "400px",
        margin: "32px auto",
    };

    const navigate = useNavigate();

    const usernameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const { updateUserInfo } = useContext(UserContext);

    const signupSuccessHandler = (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => {
        updateUserInfo(username, email, user_id, token);
        navigate("/");
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
        <FormLayout
            title="Signup"
            content={formContent}
            actions={formActions}
            style={formLayoutStyles}
        />
    );
};

export default SignupPage;
