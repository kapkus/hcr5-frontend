import { loaderPush, loaderRemove } from "../app/appSlice";
import { fetchUser } from "../../api/user";
import { authUser } from "../../api/auth";
import { checkResponse } from "../../utils/request";
import { setAccessToken } from "../../utils/utils";
import { enqueueNotification } from "../../utils/utils";
import { fetchScans as fetchScansRequest } from "../../api/scan";
import {fetchScansSuccess} from "./scanManagerSlice";

export const fetchScans = () => async (dispatch) => {
    try {
        dispatch(loaderPush({
            label: 'Fetching scans',
            actionType: 'FETCH_SCANS' 
        }));
    
        const result = await fetchScansRequest();
        const check = checkResponse(result);

        if (check) {
            const items = result;
            dispatch(fetchScansSuccess(items.data));

        } else {
            enqueueNotification(result.response.data)
        }
    } catch (err) {
        enqueueNotification(err)
    } finally {
        dispatch(loaderRemove({ actionType: 'FETCH_SCANS' }));
    }
}

export const downloadBinaryScan = (objectId) => async (dispatch) => {

}