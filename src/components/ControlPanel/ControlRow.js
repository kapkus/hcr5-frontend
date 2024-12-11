import { useEffect, useState } from "react";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { sendSocketMessage } from "../../store/socket/socketMiddleware";

/**
 * Single axis control mechanism
 * On button press down - client sends message for arm to start moving
 * On button hold - client sends heartbeat message that indicates move should be continued
 * On button release - client sends stop message which ends cycle
 * @param {*} props 
 * @returns 
 */
const ControlRow = (props) => {
    // const userData = useSelector((state) => state.userApi.queries[`fetchUser(undefined)`]?.data);
    const userSettings = useSelector((state) => state.user.userSettings);
    const [isHolding, setIsHolding] = useState(false);
    const [direction, setDirection] = useState(1);
    const {axis, cord} = props;
	const dispatch = useDispatch();
    const {step, interval} = userSettings;


    const sendStartMove = (direction) => {
        sendSocketMessage(
            {
                type: 'startMove',
                axis: axis,
                direction: direction
            }
        );
    }

    const sendHeartbeat = (direction) => {
        sendSocketMessage(
            {
                type: 'heartbeat',
                axis: axis,
                direction: direction
            }
        );
    }

    // const sendHeartbeat = (direction) => {
    //     dispatch({
    //         type: 'socket/send',
    //         payload: {
    //             forward: true,
    //             type: 'heartbeat',
    //             axis: axis,
    //             direction: direction
    //         }
    //     });
    // }

    const sendStopMove = () => {
        sendSocketMessage(
            {
                type: 'stopMove',
                axis: axis
            }
        );
    }

    const handleMouseDown = (direction) => {
        setIsHolding(true);
        // setDirection(direction);
        sendStartMove(direction, axis);
    };

    const handleMouseUp = () => {
        setIsHolding(false);
        sendStopMove(axis);
    };

    useEffect(() => {
        let intervalId;

        if(isHolding){
            intervalId = setInterval(() => {
                // handleAxisChange(direction, axis);
                sendHeartbeat(direction, axis);
            }, interval);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isHolding, direction, axis, interval]);

    return <>
            <div className="control-panel-row">
            <div className="control-panel-item">{axis}</div>
            <div className="control-panel-item">{Number(cord).toFixed(2)}</div>
            <div className="control-panel-item">
                <button className="control-panel-btn"
                    onMouseDown={() => {handleMouseDown("positive")}}
                    onMouseUp={handleMouseUp}
                    // onClick={() => handleAxisChange(1, axis)}
                >
                    <HiOutlinePlus />
                </button>
                <button className="control-panel-btn" 
                    onMouseDown={() => {handleMouseDown("negative")}}
                    onMouseUp={handleMouseUp}
                    // onClick={() => handleAxisChange(-1, axis)}
                >
                    <HiOutlineMinus />
                </button>
            </div>
        </div>
    </>
    
}


export default ControlRow;