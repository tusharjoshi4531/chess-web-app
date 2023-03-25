import axios from "axios";
import { IUserData } from "../../store/user/types";

import { SERVER_URL } from "../Util";

const login = async (
    email: string,
    password: string
): Promise<IUserData | undefined> => {
    try {
        console.log(`${SERVER_URL}/auth/login`);
        // Get login data
        const response = await axios.post<IUserData>(
            `${SERVER_URL}/auth/login`,
            { email, password }
        );

        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export default login;
