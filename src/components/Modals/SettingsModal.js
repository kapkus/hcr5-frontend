import React, { useEffect } from "react";
import { Box, Modal, Button } from "@mui/material"
import { useState } from 'react';
import { FiSettings } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useFetchUserQuery } from "../../store/user/userApi";
import { useSelector } from "react-redux";
// import useFetchSettings from "../../hooks/api/useFetchSettings";
// import { fetchUserAction } from "../../store/user/actions";

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: 2,
  };

const SettingsModal = () => {
    const dispatch = useDispatch();
    // const {data, isError, isLoading} = useSelector(state => state.user)
    // const userData = useSelector((state) => state.userApi.queries[`fetchUser(undefined)`]?.data);

    // const { data, error, isLoading } = useFetchUserQuery();

    // console.log(userData);
    const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if(open === true){
            console.log("opened")
            
            // dispatch(fetchUserAction());
        }
    }, [open])

    const handleSettingsSave = () => {

    }

    return <div>
        <FiSettings onClick={handleOpen} 
            className={'clickable-icon'}
        />
        <Modal open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div>Ustawienia</div>
                <div>
                    blablabllfsdlf
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <Button>Zapisz</Button>
                    <Button onClick={handleClose}>Zamknij</Button>
                </div>
            </Box>
        </Modal>
    </div>
}

export default SettingsModal;