import { useNavigate } from "react-router";
import styles from "./Aside.module.css";

const Aside = () => {

    const navigate = useNavigate();

    const homeClickHandler = () => {
        navigate("");
    }

    return (
        <div className={styles.Aside}>
            <button onClick={homeClickHandler}>home</button>
        </div>
    );
};

export default Aside;
