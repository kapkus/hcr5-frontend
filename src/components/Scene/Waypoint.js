import { Text, Html } from "@react-three/drei";

const Waypoint = ({waypoint}) => {
    const { x, y, z } = waypoint;
    const position = [x, y, z];

    console.log(position);

    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[10, 16, 16]} />
                <meshStandardMaterial color="red" />
            </mesh>
        
            <Html position={[0, 0, 0]} zIndexRange={[1, 0]}>
                <div style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>{waypoint.id}</div>
            </Html>
        </group>
    );
};

export default Waypoint;