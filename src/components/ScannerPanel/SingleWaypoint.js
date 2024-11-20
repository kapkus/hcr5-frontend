import React, {useState} from "react";
import appConfig from "../../config/appConfig";
import { MdOutlineDelete as DeleteIcon, MdOutlineEdit as EditIcon, MdOutlineCancel as CancelIcon, MdOutlineCheckCircle as ConfirmIcon } from "react-icons/md";
import { IconButton, TextField } from "@mui/material";
import { deleteWaypoint, editWaypoint } from "../../store/scanner/scannerSlice";
import { useDispatch } from "react-redux";

const {xAxis, yAxis, zAxis, fontDefault} = appConfig.constants.colors;
const inputProps = {
    type: 'number',
    style: {
        fontSize: '12px',
        width: '3rem'
}}

const SingleWaypoint = ({item, index, setEditWaypointIndex, editWaypointIndex}) => {
    const dispatch = useDispatch();
    const [coordinates, setCoordinates] = useState({
        x: 0,
        y: 0,
        z: 0
    })

    const onEditMode = () => {
        setEditWaypointIndex(index);
        setCoordinates({
            x: item.x,
            y: item.y,
            z: item.z
        })
    }

    const onEditCoordinate = (axis, e) => {
        const value = parseFloat(e.target.value) || 0;
        setCoordinates((prev) => ({...prev, [axis]: value}))
    }

    const onUpdateWaypoint = () => {
        dispatch(editWaypoint({id: item.id, ...coordinates}));
        setEditWaypointIndex(null);
    }

    const onCancelUpdate = () => {
        setEditWaypointIndex(null);
    }

    const onDeleteWaypoint = () => {
        dispatch(deleteWaypoint(item.id))
    }

    return (
        <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: 10,
                paddingRight: 10,
                borderBottom: "1px solid #e4e4e4",
                gap: 10
        }}>
            { (editWaypointIndex === index) ?
            <>
                <div style={{fontWeight: "bold", fontSize: 18, color: fontDefault}}>
                    {index + 1}
                </div>
                <span style={{ color: xAxis, display: "flex", alignItems: "center" }}>
                    x: <TextField value={Number(coordinates.x).toFixed(2)} inputProps={inputProps} size="small" onChange={(e) => onEditCoordinate('x', e)} />
                </span>
                <span style={{ color: yAxis, display: "flex", alignItems: "center" }}>
                    y: <TextField value={Number(coordinates.y).toFixed(2)} inputProps={inputProps} size="small" onChange={(e) => onEditCoordinate('y', e)} />
                </span>
                <span style={{ color: zAxis, display: "flex", alignItems: "center" }}>
                    z: <TextField value={Number(coordinates.z).toFixed(2)} inputProps={inputProps} size="small" onChange={(e) => onEditCoordinate('z', e)} />
                </span>
                <div>
                    <IconButton disableRipple={true} sx={{padding: 0}} onClick={onUpdateWaypoint}>
                        <ConfirmIcon />
                    </IconButton>
                    <IconButton disableRipple={true} onClick={onCancelUpdate} >
                        <CancelIcon  />
                    </IconButton>
                </div>
            </>
            :
            <>
                <div style={{fontWeight: "bold", fontSize: 18, color: fontDefault}}>
                    {index + 1}
                </div>
                <span style={{ color: xAxis }}>x: {Number(item.x).toFixed(2)}</span>
                <span style={{ color: yAxis }}>y: {Number(item.y).toFixed(2)}</span>
                <span style={{ color: zAxis }}>z: {Number(item.z).toFixed(2)}</span>
                <div>
                    <IconButton disableRipple={true} sx={{padding: 0}} onClick={onEditMode}>
                        <EditIcon />
                    </IconButton>
                    <IconButton disableRipple={true} onClick={onDeleteWaypoint} >
                        <DeleteIcon />
                    </IconButton>
                </div>
            </>
            }
        </div>
    )
}

export default SingleWaypoint;