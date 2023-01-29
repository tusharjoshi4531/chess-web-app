import { ChallengeRequestData as ChallengeData } from "../../global/types";
import styles from "./ChallengeHolder.module.css";

type ChallengeHolderProps = {
    challengeData: ChallengeData;
    onClick?: (challengeData: ChallengeData) => void;
};

const ChallengeHolder = ({ challengeData, onClick }: ChallengeHolderProps) => {
    return (
        <div className={styles.container}>
            <h2>{challengeData.name}</h2>
            <div className={styles.divider} />
            <div className={styles.data}>
                <div>Creator</div>
                <div>: {challengeData.creator}</div>
                <div>Playing as</div>
                <div>: {challengeData.creatorColor}</div>
                <div>Time Control</div>
                <div>
                    : {challengeData.timeControl.time} + {" "}
                    {challengeData.timeControl.time}
                </div>
            </div>
        </div>
    );
};

export default ChallengeHolder;
