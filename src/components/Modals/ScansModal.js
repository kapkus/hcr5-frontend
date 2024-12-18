import React, { useEffect } from "react";
import { Box, Modal, Button, List, ListItem, ListItemAvatar, ListItemText, IconButton, Avatar, Tooltip } from "@mui/material"
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useFetchUserQuery } from "../../store/user/userApi";
import { useSelector } from "react-redux";
// import useFetchSettings from "../../hooks/api/useFetchSettings";
// import { fetchUserAction } from "../../store/user/actions";
import { TbHexagon3D } from "react-icons/tb";
import { downloadBinaryScan, fetchScans, deleteScan } from "../../store/scanManager/actions";
import { MdOutlineDelete as DeleteIcon } from "react-icons/md";
import dayjs from "dayjs";
import appConfig from "../../config/appConfig"
import { GoFileBinary } from "react-icons/go";
import { TbFile3D } from "react-icons/tb";
import { RiFilePptFill } from "react-icons/ri";

const { dateTimeFormat } = appConfig.constants;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '800px',
    maxHeight: '90vh',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    overflowY: 'auto',
  };

const ScansModal = () => {
    const dispatch = useDispatch();
    const scans = useSelector((state) => state.scanManager.items);
    // const {data, isError, isLoading} = useSelector(state => state.user)
    // const userData = useSelector((state) => state.userApi.queries[`fetchUser(undefined)`]?.data);

    // const { data, error, isLoading } = useFetchUserQuery();

    // console.log(userData);
    const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if(open === true){
            dispatch(fetchScans())
            console.log("opened")
            
            // dispatch(fetchUserAction());
        }
    }, [open])

    const handleScanDelete = (item) => {
        dispatch(deleteScan(item._id));
    }

    const handleDownloadBinaryFile = (item) => {
        dispatch(downloadBinaryScan(item._id));
    }

    console.log(scans);

    return <div>
        <div style={{display: "flex", alignItems: "center", gap: '0.3rem'}}>
            <span>Scans</span>
            <TbHexagon3D onClick={handleOpen} 
                className={'clickable-icon'}
            />
        </div>
        
        <Modal open={open}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div>Saved scans</div>
                <div>
                    <List>
                        {scans.map((item) => (
                            <ListItem
                                key={item._id}
                                secondaryAction={
                                    <div style={{display: "flex", gap: 15}}>
                                        <Tooltip title={'Download ply file'}>
                                            <IconButton edge="end" aria-label="ply-file">
                                                    <RiFilePptFill />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={'Download binary file'}>
                                            <IconButton edge="end" aria-label="binary-file" onClick={() => handleDownloadBinaryFile(item)}>
                                                <GoFileBinary />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title={'Delete scan'}>
                                            <IconButton edge="end" aria-label="delete" onClick={() => handleScanDelete(item)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    
                                }
                            >
                            <ListItemAvatar>
                                <Avatar>
                                    <TbFile3D />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.scanFileName}
                                secondary={<span style={{display: 'flex', flexDirection: 'column'}}>
                                    {item.startTime && <span style={{}}>Start time: {dayjs(item.startTime).format(dateTimeFormat)}</span>}
                                    {item.endTime && <span>End time: {dayjs(item.endTime).format(dateTimeFormat)}</span>}
                                </span>}
                            />
                            </ListItem>
                        ))}
                    </List>
                </div>
                <div style={{display: "flex", justifyContent: "flex-end"}}>
                    {/* <Button>Zapisz</Button> */}
                    <Button onClick={handleClose}>Close</Button>
                </div>
            </Box>
        </Modal>
    </div>
}

export default ScansModal;