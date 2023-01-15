import Header from "./Header";
import styles from "./Layout.module.css";
import NavigationDrawer from "./NavigationDrawer";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <header>
        <Header />
      </header>
      <aside>
        <NavigationDrawer />
      </aside>
      <section>{children}</section>
    </div>
  );
};

export default Layout;
