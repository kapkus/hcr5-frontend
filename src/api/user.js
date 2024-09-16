import axiosInstance from "./axiosInstance";

export const fetchUser = (token, data) => {
    return axiosInstance.get('/user', {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => response)
    .catch(error => error);
}