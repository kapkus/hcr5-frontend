import { loaderPush, loaderRemove } from "../app/appSlice";
import { fetchUser } from "../../api/user";
import { authUser } from "../../api/auth";
import { checkResponse } from "../../utils/request";
import { setAccessToken } from "../../utils/utils";
import { enqueueNotification } from "../../utils/utils";
import { fetchScans as fetchScansRequest, deleteScan as deleteScanRequest, downladBinary as downloadBinaryScanRequest, downloadPlyMap as downloadPlyMapRequest } from "../../api/scan";
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
    try {
        dispatch(loaderPush({
            label: 'Downloading binary scan',
            actionType: 'DOWNLOAD_BINARY_SCAN' 
        }));
    
        const result = await downloadBinaryScanRequest(objectId);
        const check = checkResponse(result);

        if (check) {
            const fileName = `lidar_scan_${objectId}.bin`;
            const blob = new Blob([result.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
        } else {
            enqueueNotification(result.response.data)
        }
    } catch (err) {
        enqueueNotification(err)
    } finally {
        dispatch(loaderRemove({ actionType: 'DOWNLOAD_BINARY_SCAN' }));
    }
}

export const downloadPlyMap = (objectId, data) => async (dispatch) => {
    try {
        dispatch(loaderPush({
            label: 'Downloading ply map',
            actionType: 'DOWNLOAD_PLY_MAP' 
        }));
    
        const result = await downloadPlyMapRequest(objectId, data);
        const check = checkResponse(result);

        if (check) {
            const fileName = `lidar_scan_${objectId}.ply`;
            const blob = new Blob([result.data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            
        } else {
            enqueueNotification(result.response.data)
        }
    } catch (err) {
        enqueueNotification(err)
    } finally {
        dispatch(loaderRemove({ actionType: 'DOWNLOAD_PLY_MAP' }));
    }
}

export const deleteScan = (objectId) => async (dispatch) => {
    try {
        dispatch(loaderPush({
            label: 'Deleting scan',
            actionType: 'DELETE_SCAN' 
        }));
    
        const result = await deleteScanRequest(objectId);
        const check = checkResponse(result);

        console.log('adasd')

        if (check) {
            console.log('ok!!!!')
            console.log(result);
            dispatch(fetchScans());

        } else {
            enqueueNotification(result.response.data)
        }
    } catch (err) {
        enqueueNotification(err)
    } finally {
        dispatch(loaderRemove({ actionType: 'DELETE_SCAN' }));
    }
}