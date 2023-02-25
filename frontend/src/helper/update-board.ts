import { BoardChange, BoardState, Square } from "../global/types";

export const updateBoard = (
    currentSquare: Square,
    chosenSquare: Square,
    state: BoardState,
    changes: BoardChange[] | null = null,
    callBack: () => void = () => {}
): BoardState => {
    if (chosenSquare === null) return state;

    const { file, rank } = currentSquare;

    if (changes !== null) {
        changes.push([
            rank * 10 + file,
            state[rank][file],
            state[chosenSquare.rank][chosenSquare.file],
        ]);

        changes.push([
            chosenSquare.rank * 10 + chosenSquare.file,
            state[chosenSquare.rank][chosenSquare.file],
            null,
        ]);
    }

    state[rank][file] = state[chosenSquare.rank][chosenSquare.file];
    state[chosenSquare.rank][chosenSquare.file] = null;

    callBack();

    return state;
};
