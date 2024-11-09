import { Html } from "@react-three/drei";

const Axes = ({visible}) => {

    if(!visible)
        return null;

    return <>
        <axesHelper args={[1000]} />

        <Html position={[1000, 0, 0]}>
            <div style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>X</div>
        </Html>

        <Html position={[0, 1000, 0]}>
            <div style={{ color: 'green', fontSize: '16px', fontWeight: 'bold' }}>Y</div>
        </Html>

        <Html position={[0, 0, 1000]}>
            <div style={{ color: 'blue', fontSize: '16px', fontWeight: 'bold' }}>Z</div>
        </Html>
    </>
    

}

export default Axes;