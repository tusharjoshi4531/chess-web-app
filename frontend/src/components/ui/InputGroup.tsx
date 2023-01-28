import styles from "./InputGroup.module.css";

// type InputGroupProps = {
//     inputsProps: React.InputHTMLAttributes<HTMLInputElement>[];
// };
type InputGroupProps = {
    inputs: React.ReactNode[];
};

const InputGroup = ({ inputs }: InputGroupProps) => {
    return <div className={styles.container}>{inputs}</div>;
};

export default InputGroup;
