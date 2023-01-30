import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import FormLayout from "../components/layout/FormLayout";
import { login } from "../helper/user-auth";
import { UserContext } from "../store/user-context";

const LoginPage = () => {
    const formLayoutStyles: React.CSSProperties = {
        maxWidth: "400px",
        margin: "32px auto",
    };

    const navigate = useNavigate();

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const { updateUserInfo, socket } = useContext(UserContext);

    const loginSuccessHandler = (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => {
        updateUserInfo(username, email, user_id, token);
        if (socket) socket.emit("connect-user", { username, id: user_id });
        navigate("/");
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
        <FormLayout
            title="Login"
            content={formContent}
            actions={formActions}
            style={formLayoutStyles}
        />
    );
};

export default LoginPage;
