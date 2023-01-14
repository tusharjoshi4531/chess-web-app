import styles from "./Layout.module.css";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <div className={styles.header}>head</div>
      <div className={styles.nav}>nav</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default Layout;
