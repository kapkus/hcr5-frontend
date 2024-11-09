import React from "react";
import { LineSegments } from "three"
import * as THREE from "three";
import { Edges } from "@react-three/drei";

const RobotUTool = ({dimensions, position}) => {


    return (
        <mesh position={position}>
            <boxGeometry args={dimensions} />
            <meshStandardMaterial color="blue" opacity={0.2} transparent />
            <Edges color="blue" />
        </mesh>
    )

}

export default RobotUTool;