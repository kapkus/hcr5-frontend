import React, {useState} from "react";
import { Box, Button, MenuItem } from "@mui/material";
import { toggleScanPlanner } from "../../store/scanner/scannerSlice";
import { useDispatch, useSelector } from "react-redux";
import appConfig from "../../config/appConfig";
import { sendSocketMessage } from "../../store/socket/socketMiddleware";
import SelectTcp from "./SelectTcp";

const {colors} = appConfig.constants;

const activeButtonStyle = {
    backgroundColor: colors.active,
    color: "#ffffff",
    borderColor: colors.activeBorder
}

const ScanOptions = () => {
    const scanPlanner = useSelector((state) => state.scanner.scanPlanner);
    const dispatch = useDispatch();

    const onSetupScanPlanClick = () => {
        dispatch(toggleScanPlanner());
    }

    const onStopScanClick = () => {
        sendSocketMessage({
            type: 'endScan'
        });
    }

    return (
        <Box sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <Button variant="outlined" 
                    onClick={onSetupScanPlanClick}
                    style={scanPlanner ? activeButtonStyle : {} }        
            >
                Setup scan plan
            </Button>

            <Button onClick={onStopScanClick} variant="contained">
                Stop Scan
            </Button>
            
            <SelectTcp />

            <Button variant="outlined" >
                Set Tool Position
            </Button>

        </Box>
    )

}

export default ScanOptions;