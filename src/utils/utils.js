import { jwtDecode } from "jwt-decode";


export const getAccessToken = () => {
    return sessionStorage.getItem("access_token");
}

export const setAccessToken = (token) => {
    const decoded = jwtDecode(token);
    console.log(decoded.userId);
    sessionStorage.setItem("access_token", token);
    sessionStorage.setItem("userId", decoded.userId);

}