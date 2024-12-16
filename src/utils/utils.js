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

/**
 * Optimize path in Snake pattern
 * @description waypoints must be in evenly distributed space, 
 * otherwise this function will fail to provide optimized path
 * @param {Object[]} data - waypoints 
 * @returns {Object[]} - optimized order 
 * @todo do something if it fails
 */
export const optimizePath = (data) => {
    const rows = {};
    data.forEach(point => {
        if (!rows[point.y]) rows[point.y] = [];
        rows[point.y].push(point);
    });

    const sortedRows = Object.values(rows).map(row => row.sort((a, b) => a.x - b.x));

    const path = [];
    sortedRows.forEach((row, index) => {
        if (index % 2 === 0) {
            path.push(...row);
        } else {
            path.push(...row.reverse());
        }
    });

    return path; 
}