import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@mui/material"


const HomeButton = () => {
    const dispatch = useDispatch();
    const [isHolding, setIsHolding] = useState(false);
    const userSettings = useSelector((state) => state.user.userSettings);
    const {step, interval} = userSettings;

    const sendStartMove = () => {
        dispatch({
            type: 'socket/send',
            payload: {
                type: 'moveHome',
            }
        });
    }

    const sendHeartbeat = () => {
        dispatch({
            type: 'socket/send',
            payload: {
                type: 'heartbeat',
            }
        });
    }

    const sendStopMove = () => {
        dispatch({
            type: 'socket/send',
            payload: {
                type: 'stopMove',
            }
        });
    }

    const handleMouseDown = (direction) => {
        setIsHolding(true);
        sendStartMove();
    };

    const handleMouseUp = () => {
        setIsHolding(false);
        sendStopMove();
    };

    useEffect(() => {
        let intervalId;

        if(isHolding){
            intervalId = setInterval(() => {
                sendHeartbeat();
            }, interval);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [isHolding, interval]);


    return <Button
        variant="outlined"
        onMouseDown={() => {handleMouseDown("positive")}}
        onMouseUp={handleMouseUp}
    >
        HOME
    </Button>

}


export default HomeButton;