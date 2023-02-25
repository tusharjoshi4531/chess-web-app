import { Square } from "../global/types";

export const iterateIntermediateSquares = (
    initialSquare: Square,
    targetSquare: Square,
    callback: (square: Square) => void
) => {
    let dirFile = targetSquare.file - initialSquare.file;
    let dirRank = targetSquare.rank - initialSquare.rank;

    if (Math.max(dirFile, dirRank) === 2 && Math.min(dirFile, dirRank) === 1) {
        callback(targetSquare);
    } else if (
        Math.abs(dirFile) !== Math.abs(dirRank) &&
        dirFile * dirRank !== 0
    ) {
        console.log("invalid range of squares");
    } else {
        dirFile = Math.sign(dirFile);
        dirRank = Math.sign(dirRank);

        let { file: currFile, rank: currRank } = initialSquare;

        while (
            currFile !== targetSquare.file ||
            currRank !== targetSquare.rank
        ) {
            currFile += dirFile;
            currRank += dirRank;

            callback({ file: currFile, rank: currRank });
        }
    }
};
