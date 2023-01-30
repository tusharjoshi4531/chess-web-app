import { useContext } from "react";
import { ChallengeRequestData as ChallengeData } from "../../global/types";
import { UserContext } from "../../store/user-context";
import ChallengeHolder from "../ui/ChallengeHolder";
import styles from "./ChallengesLayout.module.css";

type ChallengesLayoutProps = {
    challenges: ChallengeData[];
};

const ChallengesLayout = ({ challenges }: ChallengesLayoutProps) => {
    const { socket } = useContext(UserContext);

    const challengeClickHandler = (challengeData: ChallengeData) => {
        if (socket)
            socket.emit(
                "accept-challenge",
                {
                    id: challengeData.creatorId,
                    username: challengeData.creator,
                    name: challengeData.name,
                    creatorColor: challengeData.creatorColor,
                    timeControl: challengeData.timeControl,
                },
                (isCreatorConnected: boolean) => {
                    if (isCreatorConnected) alert("Creator is online");
                    else alert("creator Is Ofline");
                }
            );
    };

    const challengeComponents = challenges.map((challengeData) => (
        <ChallengeHolder
            onClick={challengeClickHandler}
            challengeData={challengeData}
            key={challengeData._id}
        />
    ));

    return <div className={styles.container}>{challengeComponents}</div>;
};

export default ChallengesLayout;
