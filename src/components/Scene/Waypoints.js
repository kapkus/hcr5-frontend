import React from "react";
import * as THREE from "three";
import { Text, Html, Line } from "@react-three/drei";

const Waypoints = ({ waypoints }) => {

    const waypointsMatrix = React.useMemo(() => {

        const matrix = waypoints.map((waypoint) => [waypoint.x, waypoint.y, waypoint.z]);
        if (matrix.length > 2) {
            return [...matrix, matrix[0]];
        }
        return matrix;
        
    }, [waypoints]);

    const linePoints = React.useMemo(
        () => waypointsMatrix.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
        [waypointsMatrix]
    );

    return (
        <>
            {linePoints.length > 1 && (
                <Line points={linePoints} color={"#b83d3d"} lineWidth={2} />
            )}

            {waypoints.map((waypoint, index) => (
                <Waypoint waypoint={waypoint} index={index + 1} key={index} />
            ))}
        </>
    );
};

const Waypoint = ({ waypoint, index }) => {
    const { x, y, z } = waypoint;
    const position = [x, y, z];

    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[10, 16, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>

            <Html position={[0, 0, 0]} zIndexRange={[1, 0]}>
                <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', WebkitTextStroke: "1px black" }}>{index}</div>
            </Html>
        </group>
    );
};

export default Waypoints;