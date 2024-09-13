import axiosInstance from "./axiosInstance";

export const fetchUser = () => {
    console.log(`${process.env.REACT_APP_API_URL}:${process.env.REACT_APP_API_PORT}`)
    return axiosInstance.get('/user', {
        // headers: {
        //     Authorization: 'Bearer tołken'
        // }
    })
    .then(response => response)
    .catch(error => error);
}