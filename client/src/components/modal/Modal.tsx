import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import FormLayout from "../form/FormLayout";

import styles from "./Modal.module.css";

interface IModalProps {
    title?: string;
    content: string;
    el?: keyof HTMLElementTagNameMap;
    cancel: boolean;
    onSubmit?: () => void;
    onCancel?: () => void;
}

const Modal: React.FC<IModalProps> = ({
    title,
    content,
    el = "div",
    cancel,
    onSubmit,
    onCancel,
}) => {
    const containerRef = useRef(document.createElement(el));

    useEffect(() => {
        document.body.appendChild(containerRef.current);
        return () => {
            document.body.removeChild(containerRef.current);
        };
    }, []);

    const formSubmitHandler = () => onSubmit && onSubmit();
    const formCancelHandler = () => onCancel && onCancel();

    return createPortal(
        <div className={styles.modalContainer}>
            <FormLayout
                onSubmit={formSubmitHandler}
                title={title}
                control={<label>{content}</label>}
                actions={
                    <>
                        {cancel && (
                            <button type="button" onClick={formCancelHandler}>
                                cancel
                            </button>
                        )}
                        <button type="submit">accept</button>
                    </>
                }
                style={{
                    minWidth: 400,
                }}
            />
        </div>,
        containerRef.current
    );
};

export default Modal;
