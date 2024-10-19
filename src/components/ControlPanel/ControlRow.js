import { useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";

const ControlRow = (props) => {
    const userData = useSelector((state) => state.userApi.queries[`fetchUser(undefined)`]?.data);
    const userSettings = useSelector((state) => state.user.userSettings);
    const [isHolding, setIsHolding] = useState(false);
    const [direction, setDirection] = useState(1);
    const {axis, cord} = props;
	const dispatch = useDispatch();
    const {step, holdInterval} = userSettings || {};
    // const step = 1, interval = 1
    console.log(step, holdInterval)

    let Ainterval = 100;
    const handleAxisChange = (direction, axis) => {
		const value = step * direction;
        dispatch({ type: 'socket/send', 
            payload: {
                forward: true,
                type: 'move',
                axis: axis,
                value: value
            }
        })
    }

    useEffect(() => {
        let intervalId;

        if(isHolding){
            intervalId = setInterval(() => {
                console.log("test")
                handleAxisChange(direction, axis);
            }, Ainterval);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isHolding, direction, axis, Ainterval]);

    return <>
        { userData ?
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
        :
        <div>loading</div>
        }
        
    </>
    
}


export default ControlRow;