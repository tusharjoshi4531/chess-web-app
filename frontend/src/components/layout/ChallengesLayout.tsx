import { ChallengeRequestData as ChallengeData } from "../../global/types";
import ChallengeHolder from "../ui/ChallengeHolder";
import styles from "./ChallengesLayout.module.css";

type ChallengesLayoutProps = {
    challenges: ChallengeData[];
};

const ChallengesLayout = ({ challenges }: ChallengesLayoutProps) => {
    const challengeComponents = challenges.map((challengeData) => (
        <ChallengeHolder
            challengeData={challengeData}
            key={challengeData._id}
        />
    ));

    return <div className={styles.container}>{challengeComponents}</div>;
};

export default ChallengesLayout;
