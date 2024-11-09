import React, { useEffect } from "react";
import ControlPanel from "../../components/ControlPanel/ControlPanel"
import SettingsModal from "../../components/Modals/SettingsModal";
import { useDispatch } from "react-redux";
import { fetchUserAction } from "../../store/user/actions";
import { useSelector } from "react-redux";
import { AppBar, Toolbar, Box } from "@mui/material";
import AppToolbar from "./AppToolbar";
import config from "../../config/config";
import { getAccessToken } from "../../utils/utils";
import { initializeSocket } from "../../store/socket/socketInstance";
import { useFetchUserQuery } from "../../store/user/userApi";
import Scene from "../../components/Scene/Canvas";

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
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh',
                width: '100vw',
            }}
        >    
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    overflow: 'auto'
                }}
            >
                <Box sx={{ flexShrink: 0, padding: '4px' }}>
                    <ControlPanel />
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