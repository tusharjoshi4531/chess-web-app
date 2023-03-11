import styles from "./FormLayout.module.css";

interface IFormProps {
    style?: React.CSSProperties;
    title?: string;
    control: React.ReactNode;
    actions: React.ReactNode;
    onSubmit?: () => void;
}

const FormLayout: React.FC<IFormProps> = ({
    style,
    title,
    control,
    actions,
    onSubmit,
}) => {
    const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <form onSubmit={formSubmitHandler} style={style}>
            {title && (
                <>
                    <label className={styles.title}>{title}</label>
                    <div className={styles.divider} />
                </>
            )}
            <div className={styles.control}>{control}</div>
            <div className={styles.actions}>{actions}</div>
        </form>
    );
};

export default FormLayout;
