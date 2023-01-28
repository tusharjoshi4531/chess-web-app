import { useState } from "react";
import styles from "./ButtonGroup.module.css";

type ButtonInfo = {
    text: string;
    onClick?: () => void;
};

type ButtonGroupProps = {
    buttonsInfo: ButtonInfo[];
    onSelect?: (selected: string) => void;
};

const ButtonGroup = ({ buttonsInfo, onSelect }: ButtonGroupProps) => {
    const [selected, setSelected] = useState<string | undefined>("white");

    const buttonComponents = buttonsInfo.map(({ onClick, text }) => {
        const onButtonClick = () => {
            setSelected(text);
            if (onClick) onClick();
            if (onSelect) onSelect(text);
            // console.log(text);
        };

        console.log(selected, text, selected === text);

        return (
            <button
                onClick={onButtonClick}
                className={
                    selected === text ? styles.selected : styles.unselected
                }
                key={text}
            >
                {text}
            </button>
        );
    });

    return <div className={styles.container}>{buttonComponents}</div>;
};

export default ButtonGroup;
