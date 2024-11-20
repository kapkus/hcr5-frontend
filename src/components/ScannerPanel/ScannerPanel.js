import React, { useEffect, useState } from "react";
import { Box, Button, Icon, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@mui/material";
import ScanOptions from "./ScanOptions";
import WaypointsList from "./WaypointsList";


const ScannerPanel = () => {
    
  

    return (
        <div className="scanner-panel-container">
            <div style={{padding: 8}}>
                <ScanOptions />
            </div>
            <div style={{padding: 8}}>
                {/* <WaypointsList /> */}
            </div>
        </div>
    )
}


export default ScannerPanel;