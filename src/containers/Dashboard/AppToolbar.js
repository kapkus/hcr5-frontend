import React from "react";
import { Toolbar } from "@mui/material";
import ScansModal from "../../components/Modals/ScansModal";
import SocketStatus from "../../components/WebSocket/SocketStatus";
import { useSelector } from "react-redux";

const AppToolbar = () => {
    const {status, lidarSocketStatus} = useSelector((state) => state.socket)

    return <Toolbar>
        <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
            <div style={{display: 'flex', gap: '1rem'}}>
                <span style={{display: "flex", alignItems: "center", gap: 5}}>
                    Server <SocketStatus status={status} />
                </span>
                <span style={{display: "flex", alignItems: "center", gap: 5}}>
                    Lidar <SocketStatus status={lidarSocketStatus}/>
                </span>
            </div>
            <div>
                <ScansModal />
            </div>
        </div>
    </Toolbar>
}

export default AppToolbar;