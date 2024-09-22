import { loaderPush, loaderRemove } from "./appSlice";
import { fetchUser } from "../../api/user";
import { authUser } from "../../api/auth";
import { checkResponse } from "../../utils/request";
import { setAccessToken } from "../../utils/utils";
import { enqueueNotification } from "../../utils/utils";

export const authenticateUser = (data, onSuccess) => async (dispatch) => {
    try {

        dispatch(loaderPush({
            label: 'Loging in',
            actionType: 'AUTHENTICATE_USER' 
        }));
        
        const result = await authUser(data);
        const check = checkResponse(result);

        if (check) {
            const token = result.data.token; 
            setAccessToken(token)

            if(onSuccess) {
                onSuccess();
            }

        } else {
            enqueueNotification(result.response.data)
        }
    
    } catch (error) {
        throw new Error('Failed to fetch user data');
    } finally {
        dispatch(loaderRemove({ actionType: 'AUTHENTICATE_USER' }));
    }
};