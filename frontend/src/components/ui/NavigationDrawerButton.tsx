import styles from "./NavigationDrawerButton.module.css";

type NavigationDrawerButtonProps = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>
};

const NavigationDrawerButton = ({ children, onClick }: NavigationDrawerButtonProps) => {
  return <button className={styles.button} onClick={onClick}>
    {children}
  </button>;
};

export default NavigationDrawerButton;
