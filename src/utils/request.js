export const checkResponse = (res) => {
    if(res.request.status >= 400) {
        return false;
    } else {
        return true;
    }
}