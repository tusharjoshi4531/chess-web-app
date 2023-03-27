import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import login from "../../api/auth/login";
import { USER_ACTION_TYPE } from "../../store/user/types";
import UserContext from "../../store/user/user-context";
import FormLayout from "./FormLayout";

const LoginForm = () => {
    // Refs
    const emailInputRef = useRef<HTMLInputElement>(null!);
    const passwordIputRef = useRef<HTMLInputElement>(null!);

    // hooks
    const { userId, dispatch, socket } = useContext(UserContext);
    const navigate = useNavigate();

    // Submit handler
    const formSubmitHandler = async () => {
        const email = emailInputRef.current.value;
        const password = passwordIputRef.current.value;

        // Check if email contains @
        if (!email.trim().includes("@")) {
            return;
        }

        // Check if password is longer than 5 characters
        if (password.trim().length < 5) {
            return;
        }

        console.log(email, password);

        try {
            const userData = await login(email, password);

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
            title="Login"
            control={
                <>
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
                    <button type="submit">login</button>
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

export default LoginForm;
