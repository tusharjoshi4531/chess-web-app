import { createPortal } from "react-dom";
import FormLayout from "../layout/FormLayout";
import styles from "./Modal.module.css";

type ChallengeModalProps = {
    children: React.ReactNode;
    confirm: string;
    cancel: string;
    onConfirm?: React.MouseEventHandler<HTMLButtonElement>;
    onCancel?: React.MouseEventHandler<HTMLButtonElement>;
};

const Modal = ({
    children,
    confirm,
    cancel,
    onCancel,
    onConfirm,
}: ChallengeModalProps) => {
    return createPortal(
        <div className={styles.container}>
            <FormLayout
                title={"Challenge"}
                content={children}
                actions={
                    <>
                        <button type="submit" onClick={onConfirm}>
                            {confirm}
                        </button>
                        <button onClick={onCancel}>{cancel}</button>
                    </>
                }
                style={{ minWidth: 400, margin: "auto" }}
            />
        </div>,
        document.getElementById("portal-root")!
    );
};

export default Modal;
