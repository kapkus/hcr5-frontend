import { useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import {updateAxisX} from "../../store/app/appSlice";
import { sendSocketMessage } from '../../store/socket/socketSlice';

const ControlRow = (props) => {
    const {step, interval} = useSelector((state) => state.user.data.settings)
    const [isHolding, setIsHolding] = useState(false);
    const [direction, setDirection] = useState(1);
    const {axis, cord} = props;
	const dispatch = useDispatch();

    const handleAxisChange = (direction, axis) => {
		const value = step * direction;
        dispatch(sendSocketMessage({
            forward: true,
            type: 'move',
            axis: axis,
            value: value
        }))
    }

    useEffect(() => {
        let intervalId;

        if(isHolding){
            intervalId = setInterval(() => {
                handleAxisChange(direction, axis);
                console.log('test');
            }, interval);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isHolding, direction, axis, interval]);

    return <>
        <div className="control-panel-row">
            <div className="control-panel-item">{axis}</div>
            <div className="control-panel-item">{cord}</div>
            <div className="control-panel-item">
                <button className="control-panel-btn"
                    onMouseDown={() => {setIsHolding(true); setDirection(1)}}
                    onMouseUp={() => {setIsHolding(false)}}
                    // onClick={() => handleAxisChange(1, axis)}
                >
                    <HiOutlinePlus />
                </button>
                <button className="control-panel-btn" 
                    onMouseDown={() => {setIsHolding(true); setDirection(-1)}}
                    onMouseUp={() => {setIsHolding(false)}}
                    // onClick={() => handleAxisChange(-1, axis)}
                >
                    <HiOutlineMinus />
                </button>
            </div>
        </div>
    </>
    
}


export default ControlRow;