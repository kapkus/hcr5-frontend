import React from "react";
import { jwtDecode } from "jwt-decode";
import { enqueueSnackbar } from "notistack";
import CloseIcon from '@mui/icons-material/Close';
import { closeSnackbar } from "notistack";

export const getAccessToken = () => {
    return sessionStorage.getItem("access_token");
}

export const setAccessToken = (token) => {
    const decoded = jwtDecode(token);
    sessionStorage.setItem("access_token", token);
    sessionStorage.setItem("userId", decoded.userId);
}

export const enqueueNotification = (data) => {
// 'default' | 'error' | 'success' | 'warning' | 'info'
    const content = (
        <div>
            <div>
                {data.code || 'Error'}
            </div>
            <div>
                {data.msg || 'Something went wrong.'}
            </div>
        </div>
      );

    const options = {
        key: new Date().getTime() + Math.random(),
        variant: 'error',
        persist: true,
        action: key => (
            <div style={{cursor: "pointer"}}
                onClick={() => {closeSnackbar(key)}}>
                <CloseIcon />
            </div>
        ),
    }
    

    enqueueSnackbar(content, options)
}