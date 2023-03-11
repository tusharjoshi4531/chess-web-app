import styles from "./Navbar.module.css";

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <button>login</button>
            <button>signup</button>
        </div>
    );
};

export default Navbar;
