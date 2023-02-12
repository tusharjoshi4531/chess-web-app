import { useContext } from "react";
import ChessBoard from "../components/game/ChessBoard";
import GameLayout from "../components/layout/GameLayout";
import Timer from "../components/ui/Timer";
import { BLACK, WHITE } from "../global/types";
import { UserContext } from "../store/user-context";

const GamePage = () => {

    const { challengeData, username } = useContext(UserContext);

    const cellClickHandler = (file: number, rank: number) => {
        console.log({ file, rank });
    };

    if(!challengeData){
        return <h2>No Challenge Present</h2>
    }

    const challengeColor = challengeData.black === username ? BLACK : WHITE;
 
    return (
        // <ChessBoard size={600}/>
        <GameLayout
            game={
                <>
                    <Timer color="black" />
                    <ChessBoard
                        size={600}
                        onCellClick={cellClickHandler}
                        color={challengeColor}
                    />
                    <Timer color="white" />
                </>
            }
            status={<div>hi</div>}
        />
    );
};

export default GamePage;
