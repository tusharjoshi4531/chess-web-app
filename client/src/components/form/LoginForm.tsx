import { useRef } from "react";
import FormLayout from "./FormLayout";

const LoginForm = () => {
    // Refs
    const emailInputRef = useRef<HTMLInputElement>(null!);
    const passwordIputRef = useRef<HTMLInputElement>(null!);

    // Submit handler
    const formSubmitHandler = () => {
        const email = emailInputRef.current.value;
        const password = passwordIputRef.current.value;

        // Check if email contains @
        if (!email.trim().includes("@")) {
            return;
        }

        // Check if password is longer than 5 characters
        if (password.trim().length < 5){
            return;
        }

        console.log(email, password);
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
