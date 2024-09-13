import axiosInstance from "./axiosInstance";

export const authUser = (data) => {
    return axiosInstance.post('/login', data)
    .then(response => response)
    .catch(error => error);
}