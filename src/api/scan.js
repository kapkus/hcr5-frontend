import { getAccessToken } from "../utils/utils";
import axiosInstance from "./axiosInstance";

export const fetchScans = () => {
    const token = getAccessToken();

    return axiosInstance.get('/scans', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => error);
}