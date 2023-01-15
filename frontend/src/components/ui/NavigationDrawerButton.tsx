import styles from "./NavigationDrawerButton.module.css";

type NavigationDrawerButtonProps = {
  children: string;
};

const NavigationDrawerButton = ({ children }: NavigationDrawerButtonProps) => {
  return <button className={styles.button}>
    {children}
  </button>;
};

export default NavigationDrawerButton;
