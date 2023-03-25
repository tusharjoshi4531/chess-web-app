import { IUserData } from "../store/user/types";

export const saveUserDataToLocalStorage = (userData: IUserData): IUserData => {
    localStorage.setItem("userData", JSON.stringify(userData));
    return userData;
};

export const getUserDataFromLocalStorage = (): IUserData => {
    const data = localStorage.getItem("userData");
    if (!data) return { email: "", token: "", userId: "", username: "" };
    else return JSON.parse(data);
};

export const removeUserDataFromLocalStorage = () => {
    localStorage.removeItem("userData");
};
