import React, { useState } from "react";
import { List, ListItem, ListItemText, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { ImFileEmpty } from "react-icons/im";
import { addWaypoint } from "../../store/scanner/scannerSlice";
import appConfig from "../../config/appConfig";
import SingleWaypoint from "./SingleWaypoint";

const {fontDefault} = appConfig.constants.colors;

const WaypointsList = () => {
    const dispatch = useDispatch();
    const {waypoints} = useSelector((state) => state.scanner);
    const {x, y, z} = useSelector((state) => state.socket);
    const [editWaypointIndex, setEditWaypointIndex] = useState(null);
    
    const onAddWaypoint = () => {
        dispatch(addWaypoint({
            x: x,
            y: y,
            z: z
        }));
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Button variant="outlined" onClick={onAddWaypoint}>Add waypoint</Button>

            <List
                sx={{
                    overflow: 'auto',
                    maxHeight: 300,
                    minWidth: 400,
                    backgroundColor: "white"
                }}
            >
                {   waypoints.length ?
                    waypoints.map((item, index) => (
                        <ListItem key={item.id}
                                dense={true}
                                disablePadding={true}
                        >
                            <ListItemText>

                                <SingleWaypoint 
                                    item={item}
                                    index={index}
                                    setEditWaypointIndex={setEditWaypointIndex}
                                    editWaypointIndex={editWaypointIndex}
                                />

                            </ListItemText>
                        
                        </ListItem>
                    ))
                    :
                    <ListItem style={{display: "flex", justifyContent: "center", gap: 10, color: fontDefault}}>
                        Empty list <ImFileEmpty />
                    </ListItem>
                }
            </List>
        </div>
        
    );

}

export default WaypointsList;