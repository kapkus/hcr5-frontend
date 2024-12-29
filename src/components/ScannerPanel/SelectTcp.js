import React, { useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
import { sendSocketMessage } from "../../store/socket/socketMiddleware";
import { useSelector } from "react-redux";
import LoadingWrapper from "../Utils/LoadingWrapper";

const SelectTcp = () => {
    const {status, tcpList} = useSelector((state) => state.socket);

    useEffect(() => {
        if(status === 'connected') {
            sendSocketMessage({type: 'getTcpList'});
        }
    }, [status]);

    const sendStartMove = (direction) => {
        // sendSocketMessage(
        //     {
        //         type: 'startMove',
        //         axis: axis,
        //         direction: direction
        //     }
        // );
    }

    return (
        <LoadingWrapper isLoading={status !== 'connected'}>
            <Select size="small">
                {
                    tcpList.map((item) => (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                    ))
                }
            </Select>
        </LoadingWrapper>
        
    )

}

export default SelectTcp;