import React from "react";
import StatusIcon from "../CustomIcons/StatusIcon";
import { useSelector } from "react-redux";

const SocketStatus = () => {
    const status = useSelector((state) => state.socket.status)
    
    return <StatusIcon status={status}/>
}

export default SocketStatus;