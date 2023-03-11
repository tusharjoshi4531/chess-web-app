import Aside from "./Aside";
import styles from "./Layout.module.css";
import Navbar from "./Navbar";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <nav>
                <Navbar />
            </nav>
            <div className={styles.body}>
                <aside><Aside /></aside>
                <main>{children}</main>
            </div>
        </div>
    );
};

export default Layout;
