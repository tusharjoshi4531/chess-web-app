import styles from "./FormLayout.module.css";

type FormLayoutProps = {
    title: string;
    content: React.ReactNode;
    actions: React.ReactNode;
    style?: React.CSSProperties;
};

const FormLayout = ({ title, content, actions, style }: FormLayoutProps) => {
    return (
        <div className={styles.formControl} style={style}>
            <h3>{title}</h3>
            <div className={styles.divider}></div>
            {content}
            <div className={styles.formActions}>{actions}</div>
        </div>
    );
};

export default FormLayout;
