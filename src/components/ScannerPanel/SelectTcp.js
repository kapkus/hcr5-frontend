import React, { useEffect, useState } from "react";
import { Select, MenuItem } from "@mui/material";
import { sendSocketMessage } from "../../store/socket/socketMiddleware";
import { useSelector } from "react-redux";
import LoadingWrapper from "../Utils/LoadingWrapper";

const SelectTcp = () => {
    const {status, tcpList} = useSelector((state) => state.socket);
    const [activeTcp, setActiveTcp] = useState("");

    useEffect(() => {
        if(status === 'connected') {
            sendSocketMessage({type: 'getTcpList'});
        }
    }, [status]);

    useEffect(() => {
        const activeItem = tcpList.find(item => item.isActive);
        if (activeItem) {
            setActiveTcp(activeItem.name);
        }
    }, [tcpList]);

    const handleChange = (event) => {
        // TODO: wyslac message, znalezc metode do zmiany tcp
        setActiveTcp(event.target.value);
        // sendSocketMessage(
        //     {
        //         type: 'startMove',
        //     }
        // );
    };

    return (
        <LoadingWrapper isLoading={status !== 'connected'}>
            <Select size="small" value={activeTcp} onChange={handleChange}>
                {
                    tcpList.map((item) => (
                        <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                    ))
                }
            </Select>
        </LoadingWrapper>
        
    )

}

export default SelectTcp;