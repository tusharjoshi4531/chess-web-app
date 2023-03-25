import axios from "axios";
import { IUserData } from "../../store/user/types";


import { SERVER_URL } from "../Util";

const signup = async (
    username: string,
    email: string,
    password: string
): Promise<IUserData | undefined> => {
    try {
        // Get login data
        const response = await axios.post<IUserData>(
            `${SERVER_URL}/auth/signup`,
            { username, email, password }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default signup;
