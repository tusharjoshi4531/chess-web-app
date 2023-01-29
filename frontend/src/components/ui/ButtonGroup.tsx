import { useState } from "react";
import styles from "./ButtonGroup.module.css";

type ButtonInfo<T> = {
    text: string;
    val: T;
    onClick?: () => void;
};

type ButtonGroupProps<T> = {
    buttonsInfo: ButtonInfo<T>[];
    onSelect?: (selected: T) => void;
};

const ButtonGroup = <T,>({ buttonsInfo, onSelect }: ButtonGroupProps<T>) => {
    const [selected, setSelected] = useState<T | undefined>();

    const buttonComponents = buttonsInfo.map(({ onClick, text, val }) => {
        const onButtonClick = () => {
            setSelected(val);
            if (onClick) onClick();
            if (onSelect) onSelect(val);
            // console.log(text);
        };

        // console.log(selected, text, selected === val);

        return (
            <button
                onClick={onButtonClick}
                className={
                    selected === val ? styles.selected : styles.unselected
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
