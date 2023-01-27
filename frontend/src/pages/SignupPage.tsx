import FormLayout from "../components/layout/FormLayout";

import styles from "./SignupPage.module.css";

const SignupPage = () => {
    const formLayoutStyles: React.CSSProperties = {
        maxWidth: "400px",
        margin: "auto",
    };

    const formContent = (
        <>
            <label>username</label>
            <input type="text" />
            <label>email</label>
            <input type="email" />
            <label>password</label>
            <input type="password" />
        </>
    );

    const formActions = (
        <>
            <button type="submit">Login</button>
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

export default SignupPage;
