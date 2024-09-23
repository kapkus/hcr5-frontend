import React from "react";
import { Toolbar } from "@mui/material";
import SettingsModal from "../../components/Modals/SettingsModal";
import WebSocketStatus from "../../components/WebSocket/WebSocketStatus";

const AppToolbar = () => {

    return <Toolbar>
        <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
            <div>
                <WebSocketStatus />
            </div>
            <div>
                <SettingsModal />
            </div>
        </div>
    </Toolbar>
}

export default AppToolbar;