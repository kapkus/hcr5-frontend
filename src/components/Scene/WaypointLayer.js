import React from "react"
import Waypoints from "./Waypoints";
import { useSelector } from "react-redux";
import WaypointsHull from "./WaypointsHull";

const WaypointLayer = () => {
    const {waypoints, zLevel, verticalDistance, horizontalDistance} = useSelector((state) => state.scanner);

    return (
        <>
        
        <Waypoints waypoints={waypoints} />

        <WaypointsHull 
            waypoints={waypoints} 
            zLevel={zLevel} 
            verticalDistance={verticalDistance}
            horizontalDistance={horizontalDistance}
        />
        
    </>)
}

export default WaypointLayer;