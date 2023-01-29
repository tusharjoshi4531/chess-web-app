import { model, Schema } from "mongoose";
import { IChallenge, IChallengeSchema, TimeControl } from "../global/types";

const TimeControlSchema = new Schema<TimeControl>({
    time: { type: Number, required: true },
    increment: { type: Number, required: true },
});

const ChallengeSchema = new Schema<IChallengeSchema>({
    creatorId: {type: String, required: true},
    creator: { type: String, required: true },
    name: {type: String, required: true},
    creatorColor: { type: String, required: true },
    timeControl: TimeControlSchema,
    status: {type: String, required: true},
});

const ChallengeModel = model<IChallenge>("Challenge", ChallengeSchema);

export default ChallengeModel
