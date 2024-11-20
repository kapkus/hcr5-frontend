import { Html } from "@react-three/drei";
import { useSceneContext } from "./SceneProvider";

const Axes = () => {
    const { isAxesVisible } = useSceneContext();


    if(!isAxesVisible)
        return null;

    return <>
        <axesHelper args={[1000]} />

        <Html position={[1000, 0, 0]} zIndexRange={[1, 0]}>
            <div style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>X</div>
        </Html>

        <Html position={[0, 1000, 0]} zIndexRange={[1, 0]}>
            <div style={{ color: 'green', fontSize: '16px', fontWeight: 'bold' }}>Y</div>
        </Html>

        <Html position={[0, 0, 1000]} zIndexRange={[1, 0]}>
            <div style={{ color: 'blue', fontSize: '16px', fontWeight: 'bold' }}>Z</div>
        </Html>
    </>
    

}

export default Axes;