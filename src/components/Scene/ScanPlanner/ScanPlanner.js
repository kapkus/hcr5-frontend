import React, { useRef, useState } from "react"
import { Html } from "@react-three/drei";
import appConfig from "../../../config/appConfig";
import { Dialog, Paper, DialogContent, DialogContentText, DialogActions, Button, DialogTitle, ThemeProvider, TextField, Tooltip, IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import sceneModalTheme from "./SceneModalTheme";
import WaypointsList from "../../ScannerPanel/WaypointsList";
import { toggleScanPlanner, setZLevel, setVerticalDistance, setHorizontalDistance } from "../../../store/scanner/scannerSlice";
import { BorderColor } from "@mui/icons-material";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useLatticeStore } from "../../../hooks/api/useLatticeStore";
import { sendSocketMessage } from "../../../store/socket/socketMiddleware";
import { optimizePath } from "../../../utils/utils";

const { colors } = appConfig.constants;
const inputProps = {
    type: 'number',
    style: {
        fontSize: '14px',
        width: '3rem',
}}

const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'white',
    }
}

/** Draggable wrapper */
const PaperComponent = (props) => {
    const nodeRef = useRef();

    return (
        <Draggable nodeRef={nodeRef}
            handle={"#draggable-dialog-title"}
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper ref={nodeRef} {...props} />
        </Draggable>
    );
}

const ScanPlanner = () => {
    const dispatch = useDispatch();
    const {scanPlanner: isEnabled, zLevel, verticalDistance, horizontalDistance} = useSelector((state) => state.scanner);
    const { getLatticePoints } = useLatticeStore();
    const [isDataSent, setIsDataSent] = useState(false);

    console.log(isEnabled);

    const handleClose = () => {
        dispatch(toggleScanPlanner());
    }

    const onChangeZLevel = (e) => {
        console.log(e.target.value)
        dispatch(setZLevel(e.target.value))
    }

    const onChangeVerticalDistance = (e) => {
        dispatch(setVerticalDistance(e.target.value))
    }

    const onChangeHorizontalDistance = (e) => {
        dispatch(setHorizontalDistance(e.target.value))
    }

    const handleSendScanData = () => {
        const latticePoints = getLatticePoints();
        const optimized = optimizePath(latticePoints);
        
        sendSocketMessage(
            {
                type: 'beginScan',
                data: optimized,
                zLevel: zLevel
            }
        );
    }

    return (
        <ThemeProvider theme={sceneModalTheme}>
            <Dialog open={isEnabled}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                slotProps={{
                    backdrop: {
                        invisible: true
                    }
                }}
                PaperProps={{
                    style: {
                        backgroundColor: colors.darkerTransparent,
                        color: 'white', 
                    },
                }}
            >
                <DialogTitle id="draggable-dialog-title">
                    Set boundary points for scan
                </DialogTitle>
                <DialogContent style={{ pointerEvents: 'auto' }}>
                    <div style={{marginTop: 10}}>
                        <WaypointsList />
                        <div style={{display: "flex", alignItems: 'center', marginTop: '0.6rem'}}>
                            <div>Set Z level:</div>

                            <TextField  
                                inputProps={inputProps} 
                                size={"small"} 
                                style={{marginLeft: '1rem'}}
                                sx={textFieldStyles} 
                                value={Number(zLevel).toFixed(2)} 
                                onChange={onChangeZLevel}
                            />
                            
                            <Tooltip title={'Base Z level is inherited from first added waypoint, however you can change it as you like'}
                                     PopperProps={{sx: {zIndex: 1200,},}}
                            >
                                <IconButton>
                                    <AiFillQuestionCircle style={{fontSize: '1.5rem', marginLeft: '0.3rem', color: 'white'}} />
                                </IconButton>
                            </Tooltip>
                            
                        </div>

                        <div style={{display: "flex", alignItems: 'center'}}>
                            Vertical distance:
                            <TextField  
                                inputProps={inputProps} 
                                size={"small"} 
                                style={{marginLeft: '1rem'}}
                                sx={textFieldStyles} 
                                value={verticalDistance} 
                                onChange={onChangeVerticalDistance}
                            />
                        </div>

                        <div style={{display: "flex", alignItems: 'center'}}>
                            Horizontal distance:
                            <TextField  
                                inputProps={inputProps} 
                                size={"small"} 
                                style={{marginLeft: '1rem'}}
                                sx={textFieldStyles} 
                                value={horizontalDistance} 
                                onChange={onChangeHorizontalDistance}
                            />
                        </div>

                    </div>
                </DialogContent>
                <DialogActions style={{ pointerEvents: 'auto' }}>
                    <Button variant={"outlined"} autoFocus onClick={handleClose}>Cancel</Button>
                    <Button variant={"outlined"} onClick={handleSendScanData}>Send</Button>
                </DialogActions>
            </Dialog>

        </ThemeProvider>
    )
    
}

export default ScanPlanner;