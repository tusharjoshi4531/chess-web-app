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

    const {
        updateUserInfo,
        socket,
        connect,
        setChallengeData,
        setRoomId,
        methods,
    } = useContext(UserContext);

    const loginSuccessHandler = (
        username: string,
        email: string,
        user_id: string,
        token: string
    ) => {
        if (socket) {
            connect();

            methods.addChallengeReceivedEvent((data) => {
                setChallengeData({ ...data, accepted: false });
            });

            methods.addChallengeCreatedEvent((roomName, data) => {
                alert("challenge Created");
                setRoomId(roomName);

                console.log(data);

                setChallengeData({ ...data, accepted: true });

                navigate("/Game");
            });

            socket.emit(
                "connect-user",
                { username, id: user_id },
                (status: boolean) => {
                    if (status) {
                        // alert("User Connected")
                        updateUserInfo(username, email, user_id, token);
                        navigate("/");
                    } else {
                        alert("User already logged in");
                    }
                }
            );
        } else {
            alert("Not connected to websocket");
        }
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
