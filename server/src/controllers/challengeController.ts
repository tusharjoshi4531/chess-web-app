import { Request, RequestHandler } from "express";
import { IChallenge, IChallengeSchema } from "../global/types";
import ChallengeModel from "../models/challenge";

export const addChallenge: RequestHandler = async (
    req: Request<{}, {}, IChallengeSchema>,
    res
) => {
    // Check if challenge name exists
    const { creator } = req.body;

    try {
        const existingChallenge = await ChallengeModel.findOne({ creator });

        if (existingChallenge) {
            return res
                .status(400)
                .json({ message: "Creator has already created a challenge" });
        }

        const result = await ChallengeModel.create({
            ...req.body,
            status: "pending",
        });

        res.status(201).json({ message: "Successfully added challenge" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export const getChallenges: RequestHandler = async (req, res) => {
    try {
        const challenges = await ChallengeModel.find();

        res.status(200).json(challenges);
    } catch (error) {
        res.status(500).json({ message: "Something wnt wrong" });
    }
};
