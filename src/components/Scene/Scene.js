import { Canvas } from "@react-three/fiber";
import React, {useEffect, useRef, useState} from "react";
import { Line, OrbitControls, Grid, Stats, Html, Text } from "@react-three/drei";
import * as THREE from 'three'
import RobotUTool from "./RobotUTool";
import { useSelector } from "react-redux";
import { PerspectiveCamera } from "@react-three/drei";
import Axes from "./Axes";
import SceneToolbar from "./SceneToolbar";
import { SceneProvider } from "./SceneProvider";
import ScanPlanner from "./ScanPlanner/ScanPlanner";
import WaypointLayer from "./WaypointLayer";

const Scene = () => {
    const socketData = useSelector((state) => state.socket);
    // const {waypoints} = useSelector((state) => state.scanner);
    
    const cameraRef = useRef();
    const controlsRef = useRef();

    useEffect(() => {
        THREE.Object3D.DEFAULT_UP = new THREE.Vector3(0, 0, 1); // Z-axis as vertical axis
    }, []);
    

    return (
        <SceneProvider>
            <div style={{ position: "relative", width: "100%", height: '100%', boxSizing: "border-box" }}>
            {/* <div> */}
                <Canvas>
                    <PerspectiveCamera ref={cameraRef} makeDefault position={[1800, 0, 1000]} near={0.1} far={5000}/>
                    <ambientLight intensity={0.5} />
                
                    <RobotUTool dimensions={[50, 50, 50]} position={[socketData.x, socketData.y, socketData.z]}/>
                    
                    <polarGridHelper 
                        args={[1000, 20, 20, 50, '#e3e3e3', '#e3e3e3']} 
                        position={[0, 0, -5]}  
                        rotation={[Math.PI/2, 0, 0]}
                    />
                    

                    <WaypointLayer  />
                    <Axes />

                    <OrbitControls 
                        ref={controlsRef} 
                        enablePan={true}
                        enableDamping={true} 
                        dampingFactor={0.1}
                        minDistance={10}
                        maxDistance={4000} 
                    />


                </Canvas>

                {/* UI */}

                <ScanPlanner />

                <SceneToolbar 
                    cameraRef={cameraRef}
                    controlsRef={controlsRef}
                />
                
            </div>
        </SceneProvider>
        
    );
};

export default Scene;