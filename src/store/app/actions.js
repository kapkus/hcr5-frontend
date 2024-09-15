import { loaderPush, setData, setError, loaderRemove } from "./appSlice";
import { fetchUser } from "../../api/user";
import { authUser } from "../../api/auth";
import { checkResponse } from "../../utils/request";
import { setAccessToken } from "../../utils/utils";

export const fetchUserSettings = (payload) => async (dispatch) => {
    try {
        dispatch(loaderPush({
            label: 'Loading user settings',
            actionType: 'FETCH_USER_SETTINGS' 
        }));
        console.log("fetch")
        
        const response = await fetchUser();
        console.log(response)
        if (response.status === 200) {

            dispatch(setData(response.data)); // Assuming response.data contains user data
            console.log("ok")
        } else {
            throw new Error('Failed to fetch user data');
        }
    
    } catch (error) {
        // Handle error
        dispatch(setError(error.message || 'Something went wrong'));  
    } finally {
        // End loader
        dispatch(loaderRemove({ actionType: 'FETCH_USER_SETTINGS' }));
    }
};

export const authenticateUser = (payload) => async (dispatch) => {
    try {

        dispatch(loaderPush({
            label: 'Loging in',
            actionType: 'AUTHENTICATE_USER' 
        }));
        
        const response = await authUser(payload);
        const check = checkResponse(response);

        if (check) {
            const token = response.data.token; 
            console.log(token)
            setAccessToken(token)
            // setAccessToken()
            // dispatch(setData(response.data)); // Assuming response.data contains user data
        } else {
            throw new Error('Failed to fetch user data');
        }
    
    } catch (error) {
        // Handle error
        dispatch(setError(error.message || 'Something went wrong'));  
    } finally {
        // End loader
        dispatch(loaderRemove({ actionType: 'AUTHENTICATE_USER' }));
    }
};