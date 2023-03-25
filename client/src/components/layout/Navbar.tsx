import { useContext } from "react";
import { useNavigate } from "react-router";
import { removeUserDataFromLocalStorage } from "../../helper/local-storage";
import { USER_ACTION_TYPE } from "../../store/user/types";
import UserContext from "../../store/user/user-context";
import styles from "./Navbar.module.css";

const Navbar = () => {
    //hooks
    const navigate = useNavigate();
    const { userId, dispatch } = useContext(UserContext);

    const loginClickHandler = () => {
        navigate("/login");
    };

    const signupClickHandler = () => {
        navigate("/signup");
    };

    const logoutClickHandler = () => {
        dispatch({ type: USER_ACTION_TYPE.CLEAR_USER });
        removeUserDataFromLocalStorage();
    };

    return (
        <div className={styles.navbar}>
            {!userId && (
                <>
                    <button onClick={loginClickHandler}>login</button>
                    <button onClick={signupClickHandler}>signup</button>
                </>
            )}
            {userId && <button onClick={logoutClickHandler}>logout</button>}
        </div>
    );
};

export default Navbar;
