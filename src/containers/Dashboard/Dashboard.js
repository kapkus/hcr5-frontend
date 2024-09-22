import React, { useEffect } from "react";
import ControlPanel from "../../components/ControlPanel/ControlPanel"
import SettingsModal from "../../components/Modals/SettingsModal";
import { useDispatch } from "react-redux";
import { fetchUserAction } from "../../store/user/actions";
import { useSelector } from "react-redux";
import { AppBar, Toolbar } from "@mui/material";

const Dashboard = () => {
    const dispatch = useDispatch();
	const userState = useSelector((state) => state.user);
    console.log(userState)

    useEffect(() => {
        dispatch(fetchUserAction());
    }, [])

    return <>
        <AppBar position="static">
            <Toolbar>
                
            </Toolbar>
        </AppBar>
        <ControlPanel />
        <SettingsModal />
    </>
}

export default Dashboard;