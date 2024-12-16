import React, { useEffect } from "react";
import ControlPanel from "../../components/ControlPanel/ControlPanel"
import { useDispatch } from "react-redux";
import { fetchUserAction } from "../../store/user/actions";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box } from "@mui/material";
import AppToolbar from "./AppToolbar";
import config from "../../config/config";
import { getAccessToken } from "../../utils/utils";
import Scene from "../../components/Scene/Scene";
import ScannerPanel from "../../components/ScannerPanel/ScannerPanel";

const socketUrl = `${config.WSS_URL}:${config.WSS_PORT}`;

const Dashboard = () => {
    const dispatch = useDispatch();
    // const { data, error, isLoading } = useFetchUserQuery();


    useEffect(() => {
        // dispatch(fetchUserAction());
        const token = getAccessToken();
		if(token){
			console.log("test")
            dispatch({ type: 'socket/initialize', payload: { url: socketUrl } });
			// dispatch(initializeSocket(socketUrl));
		}
    }, [dispatch])

    return (
        <Box className='app-wrapper' >    
            <Box className='app-container'>
                <Box className='interface-container'>
                    <ControlPanel />
                    <ScannerPanel />
                </Box>
                <Box sx={{ flexGrow: 1, overflow: 'auto', minHeight: 600}}>
                    <Scene />
                </Box>
            </Box>
            <AppBar position="static" sx={{ top: 'auto', bottom: 0 }}>
                <AppToolbar />
            </AppBar>
        </Box>
    )
    
        
        
}

export default Dashboard;