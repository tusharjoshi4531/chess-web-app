import styles from "./ChangeMoveButton.module.css";

type ChangeMoveButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const ChangeMoveButton = ({ children, disabled = false, onClick }: ChangeMoveButtonProps) => {
  return (
    <button className={styles.btn} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default ChangeMoveButton;
