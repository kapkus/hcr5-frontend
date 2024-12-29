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

export const deleteScan = (id) => {
    const token = getAccessToken();
    return axiosInstance.delete(`/scan/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => error);
}

export const downladBinary = (id) => {
    const token = getAccessToken();
    return axiosInstance.get(`/scan/${id}/bin`, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => error);
}

export const downloadPlyMap = (id, data) => {
    const token = getAccessToken();
    return axiosInstance.post(`/scan/${id}/ply`,
        data, 
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    .then(response => response)
    .catch(error => error);
}
