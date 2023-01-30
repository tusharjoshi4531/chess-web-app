import { Request, RequestHandler } from "express";
import { Challenge } from "../global/types";
import ChallengeModel from "../models/challenge";

export const addChallenge: RequestHandler = async (
    req: Request<{}, {}, Challenge>,
    res
) => {
    // Check if challenge name exists
    const { username, id, name, creatorColor, timeControl } = req.body;

    try {
        const existingChallenge = await ChallengeModel.findOne({
            creator: username,
        });

        if (existingChallenge) {
            return res
                .status(400)
                .json({ message: "Creator has already created a challenge" });
        }

        const newChallenge = {
            creator: username,
            creatorId: id,
            creatorColor: creatorColor,
            timeControl: timeControl,
            name: name,
            status: "pending",
        };

        console.log(newChallenge);

        const result = await ChallengeModel.create(newChallenge);

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
