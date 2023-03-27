import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import signup from "../../api/auth/signup";
import { USER_ACTION_TYPE } from "../../store/user/types";
import UserContext from "../../store/user/user-context";
import FormLayout from "./FormLayout";

const SignupForm = () => {
    // refs
    const usernameInputRef = useRef<HTMLInputElement>(null!);
    const emailInputRef = useRef<HTMLInputElement>(null!);
    const passwordIputRef = useRef<HTMLInputElement>(null!);

    // Hooks
    const { dispatch, socket } = useContext(UserContext);
    const navigate = useNavigate();

    // Submit handler
    const formSubmitHandler = async () => {
        const username = usernameInputRef.current.value;
        const email = emailInputRef.current.value;
        const password = passwordIputRef.current.value;

        // Check if username is longer than 5 characters
        if (username.trim().length < 5) {
            return;
        }

        // Check if email contains @
        if (!email.trim().includes("@")) {
            return;
        }

        // Check if password is longer than 5 characters
        if (password.trim().length < 5) {
            return;
        }

        console.log(email, password, username);

        try {
            const userData = await signup(username, email, password);

            if (!userData) return;
            socket.connect(
                {
                    userId: userData.userId,
                    username: userData.username,
                    email: userData.email,
                },
                (status) => {
                    if (!status) return;
                    dispatch({
                        type: USER_ACTION_TYPE.UPDATE_USER,
                        payload: userData,
                    });
                    navigate("/");
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FormLayout
            title="Signup"
            control={
                <>
                    <label>Username</label>
                    <input
                        placeholder="Username"
                        type="username"
                        ref={usernameInputRef}
                    />

                    <label>Email</label>
                    <input
                        placeholder="Email"
                        type="email"
                        ref={emailInputRef}
                    />

                    <label>Password</label>
                    <input
                        placeholder="Password"
                        type="password"
                        ref={passwordIputRef}
                    />
                </>
            }
            actions={
                <>
                    <button type="submit">signup</button>
                </>
            }
            style={{
                width: "50%",
                margin: "32px auto",
            }}
            onSubmit={formSubmitHandler}
        />
    );
};

export default SignupForm;
