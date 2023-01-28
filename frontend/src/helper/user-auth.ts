import axios from "axios";
import { SERVER_URL } from "../global/strings";
import {
    RequestErrorCallback,
    UserRequestCallback,
    UserRequestData,
} from "../global/types";

export const signup = async (
    email: string,
    username: string,
    password: string,
    callback?: UserRequestCallback,
    errorCallback?: RequestErrorCallback
) => {
    try {
        const response = await axios.post<UserRequestData>(
            `${SERVER_URL}/users/signup`,
            { email, username, password }
        );

        if (callback)
            callback(
                response.data.user.username,
                response.data.user.email,
                response.data.user._id,
                response.data.token
            );
    } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error)) {
            if (errorCallback) errorCallback(error.response?.data.message);
            console.log(error.response?.data);
        }
    }
};

export const login = async (
    email: string,
    password: string,
    callback?: UserRequestCallback,
    errorCallback?: RequestErrorCallback
) => {
    try {
        const response = await axios.post<UserRequestData>(
            `${SERVER_URL}/users/signin`,
            { email, password }
        );

        if (callback)
            callback(
                response.data.user.username,
                response.data.user.email,
                response.data.user._id,
                response.data.token
            );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (errorCallback) errorCallback(error.response?.data.message);
        }
    }
};
