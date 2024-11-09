import { Canvas } from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";
import { Line, OrbitControls, Grid, Stats, Html, Text } from "@react-three/drei";
import * as THREE from 'three'
import RobotUTool from "./RobotUTool";
import { useSelector } from "react-redux";
import { useThree } from "@react-three/fiber";
import { IconButton } from "@mui/material";
import { SlTarget } from "react-icons/sl";
import { LuMove3D } from "react-icons/lu";
import { PerspectiveCamera } from "@react-three/drei";
import Axes from "./Axes";


const Scene = () => {
    const socketData = useSelector((state) => state.socket);
    const [isAxesVisible, setIsAxesVisible] = useState(true);

    const cameraRef = useRef();
    const controlsRef = useRef();

    useEffect(() => {
        THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1); // Z-axis as vertical axis
    }, []);

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
    };

    const toggleAxesVisibility = () => {
        setIsAxesVisible(prevState => !prevState);
    }

    return (
        <div style={{ position: "relative", width: "100%", height: '100%', boxSizing: "border-box" }}>
            <Canvas>
                <PerspectiveCamera ref={cameraRef} makeDefault position={[1800, 0, 1000]} near={0.1} far={5000}/>
                <ambientLight intensity={0.5} />
               
                <RobotUTool dimensions={[50, 50, 50]} position={[socketData.x, socketData.y, socketData.z]}/>
                
                <polarGridHelper 
                    args={[1000, 20, 20, 50, '#e3e3e3', '#e3e3e3']} 
                    position={[0, 0, -5]}  
                    rotation={[Math.PI/2, 0, 0]}
                />
                
                <Axes visible={isAxesVisible} />
                <OrbitControls 
                    ref={controlsRef} 
                    enablePan={true}
                    enableDamping={true} 
                    dampingFactor={0.1}
                    minDistance={10}
                    maxDistance={4000} 
                />

            </Canvas>

            <div className="toolbar">
                <IconButton color="primary" onClick={resetCamera}>
                    <SlTarget />
                </IconButton>
                <IconButton color="primary" onClick={toggleAxesVisibility}>
                    <LuMove3D />
                </IconButton>

            </div>
        </div>
    );
};

export default Scene;