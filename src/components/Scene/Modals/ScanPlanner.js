import React, { useRef } from "react"
import { Html } from "@react-three/drei";
import appConfig from "../../../config/appConfig";
import { Dialog, Paper, DialogContent, DialogContentText, DialogActions, Button, DialogTitle, ThemeProvider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "react-draggable";
import sceneModalTheme from "./SceneModalTheme";
import WaypointsList from "../../ScannerPanel/WaypointsList";
import { toggleScanPlanner } from "../../../store/scanner/scannerSlice";

const { colors } = appConfig.constants;

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
    const isEnabled = useSelector((state) => state.scanner.scanPlanner);

    console.log(isEnabled);

    const handleClose = () => {
        dispatch(toggleScanPlanner());
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
                    </div>
                </DialogContent>
                <DialogActions style={{ pointerEvents: 'auto' }}>
                    <Button variant={"outlined"} autoFocus onClick={handleClose}>Cancel</Button>
                    <Button variant={"outlined"} onClick={handleClose}>Next</Button>
                </DialogActions>
            </Dialog>

        </ThemeProvider>
    )
    
}

export default ScanPlanner;