import { loaderPush, setData, setError, loaderRemove } from "./appSlice";
import { fetchUser } from "../../api/user";
import { authUser } from "../../api/auth";

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
        console.log(payload)

        dispatch(loaderPush({
            label: 'Loging in',
            actionType: 'AUTHENTICATE_USER' 
        }));
        console.log("auth")
        
        const response = await authUser();
        console.log(response)
        if (response.status === 200) {

            // dispatch(setData(response.data)); // Assuming response.data contains user data
            console.log("ok")
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