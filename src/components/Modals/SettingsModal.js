import React, { useEffect } from "react";
import { Box, Modal, Button } from "@mui/material"
import { useState } from 'react';
import { FiSettings } from "react-icons/fi";
// import useFetchSettings from "../../hooks/api/useFetchSettings";

const style = {
    position: 'absolute',
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    padding: 2,
  };

const SettingsModal = () => {
    // const {open, onClose} = props;

    // const fetchSettings = useFetchSettings();
    // useEffect(() => {
    //     fetchSettings();
    // }, [fetchSettings])

    const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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