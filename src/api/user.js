import { getAccessToken } from "../utils/utils";
import axiosInstance from "./axiosInstance";

export const fetchUser = (data) => {
    const token = getAccessToken();

    return axiosInstance.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => error);
}