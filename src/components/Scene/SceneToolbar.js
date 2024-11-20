import React, {useState} from "react"
import { Tooltip, IconButton, Select, Button } from "@mui/material";
import { IoIosPin as PinIcon } from "react-icons/io";
import { SlTarget } from "react-icons/sl";
import { LuMove3D } from "react-icons/lu";
import { useSceneContext } from "./SceneProvider";
import Dropdown from "../UiElements/Dropdown";
import { FaArrowsTurnToDots as WaypointsIcon } from "react-icons/fa6";
import { RiExpandHeightLine as HeightIcon } from "react-icons/ri";

const SceneToolbar = ({cameraRef, controlsRef}) => {
    const { toggleAxesVisibility } = useSceneContext();

    const resetCamera = () => {
        if (cameraRef.current) {
            cameraRef.current.position.set(1800, 0, 1000);
            cameraRef.current.lookAt(0, 0, 0);
            cameraRef.current.updateProjectionMatrix();

            if (controlsRef.current) {
                controlsRef.current.target.set(0, 0, 0);
                controlsRef.current.update();
            }
        }
    }

    const waypointOptions = [
        { key: 1, render: (
            <Tooltip title="Toggle waypoints" placement="left">
                <IconButton color="primary">
                    <PinIcon />
                </IconButton>
            </Tooltip>
        ) },
        { key: 2, render: (
            <Tooltip title="Toggle paths" placement="left">
                <IconButton color="primary">
                    <WaypointsIcon />
                </IconButton>
            </Tooltip>
        ) },
        { key: 3, render: (
            <Tooltip title="Toggle Z scan height" placement="left">
                <IconButton color="primary">
                    <HeightIcon />
                </IconButton>
            </Tooltip>
        ) },
    ];
    

    return <div className="toolbar">
        <Tooltip title="Reset camera">
            <IconButton color="primary" onClick={resetCamera}>
                <SlTarget />
            </IconButton>
        </Tooltip>

        <Tooltip title="Toggle axes">
            <IconButton color="primary" onClick={toggleAxesVisibility}>
                <LuMove3D />
            </IconButton>
        </Tooltip>
    
        <Dropdown items={waypointOptions}>
            <Tooltip title="Waypoints">
                <IconButton color="primary">
                    <PinIcon />
                </IconButton>
            </Tooltip>
        </Dropdown>
        
    </div>

}

export default SceneToolbar;