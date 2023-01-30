import axios from "axios";
import { SERVER_URL } from "../global/strings";
import {
    ChallengeRequestCallback,
    ChallengeRequestData,
    RequestErrorCallback,
} from "../global/types";

export const addChallenge = async (
    accessToken: string,
    name: string,
    creatorColor: "Black" | "White" | "Any",
    timeControl: { time: number; increment: number }
): Promise<string> => {
    try {
        const response = await axios.post<{ message: string }>(
            `${SERVER_URL}/challenges/add`,
            { name, creatorColor, timeControl },
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        return response.data.message;
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            return error.response?.data.message;
        } else {
            return "Something went wrong";
        }
    }
};

export const getChallenges = async (
    accessToken: string,
    callback?: ChallengeRequestCallback,
    errorCallback?: RequestErrorCallback
) => {
    try {
        const response = await axios.get<ChallengeRequestData[]>(
            `${SERVER_URL}/challenges/get`,
            {
                headers: { Authorization: `Bearer ${accessToken}` },
            }
        );
        if (callback) callback(response.data);
    } catch (error) {
        console.log(error);
        if (axios.isAxiosError(error)) {
            if (errorCallback) errorCallback(error.response?.data.message);
        }
    }
};
