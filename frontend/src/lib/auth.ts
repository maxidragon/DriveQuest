import {backendRequest} from "./request";

const TOKEN_NAME = "drivequest-token";
const USER_INFO_NAME = "drivequest-userInfo";


export const registerUser = async (
    email: string,
    password: string,
) => {
    try {
        const body = {
            email: email,
            password: password,
        };
        const response = await backendRequest("auth/register", "POST", false, body);
        return response.status;
    } catch (error) {
        console.log(error);
    }
};

export const login = async (
    email: string,
    password: string
)=> {
    const response = await backendRequest("auth/login", "POST", false, {
        email: email,
        password: password,
    });
    const data = await response.json();
    if (response.status === 200 && data.token) {
        localStorage.setItem(TOKEN_NAME, data.token);
        localStorage.setItem(USER_INFO_NAME, JSON.stringify(data.userInfo));
    }
    return {
        status: response.status,
        data: data,
    };
};

export const verifyEmail = async (token: string) => {
    const response = await backendRequest("auth/verify", "POST", false, { token: token });
    return response.status;
};

export const getToken = () => {
    return localStorage.getItem(TOKEN_NAME);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem(USER_INFO_NAME);
};

export const isUserLoggedIn = () => {
    return localStorage.getItem(TOKEN_NAME) !== null;
};

export const getUserInfo = () => {
    const userInfo = localStorage.getItem(USER_INFO_NAME);
    if (userInfo === null) {
        return null;
    }
    return JSON.parse(userInfo);
};