import styles from "./Timer.module.css";

type TimerProps = {
  color: "black" | "white";
};

const Timer = ({ color }: TimerProps) => {
  const timerClasses = `${styles.timer} ${
    color === "white" ? styles.whiteTimer : styles.blackTimer
  }`;

  return <div className={timerClasses}>10:00</div>;
};

export default Timer;
