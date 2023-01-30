import { model, Schema } from "mongoose";
import { ChallengeSchema, TimeControl } from "../global/types";

const TimeControlSchema = new Schema<TimeControl>({
    time: { type: Number, required: true },
    increment: { type: Number, required: true },
});

const ChallengeSchema = new Schema<ChallengeSchema>({
    creatorId: {type: String, required: true},
    creator: { type: String, required: true },
    name: {type: String, required: true},
    creatorColor: { type: String, required: true },
    timeControl: TimeControlSchema,
    status: {type: String, required: true},
});

const ChallengeModel = model<ChallengeSchema>("Challenge", ChallengeSchema);

export default ChallengeModel
