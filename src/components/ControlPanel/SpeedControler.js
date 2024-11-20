import React, { useEffect, useState } from 'react';
import { Slider, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import { sendSocketMessage } from '../../store/socket/socketMiddleware';

const MIN_VALUE = 1; 
const MAX_VALUE = 100;

const SpeedControler = () => {
    const syncSpeed = useSelector((state) => state.socket.speed);
    const [speed, setSpeed] = useState(100);


    useEffect(() => {
        const newSpeed = parseInt(syncSpeed * 100, 10);
        console.log(newSpeed)

        setSpeed(newSpeed);
    }, [syncSpeed])


    const onSpeedChange = (e) => {
        let newValue = parseInt(e.target.value, 10);

            if (newValue > MAX_VALUE) {
                newValue = MAX_VALUE;
            } else if (newValue < MIN_VALUE || isNaN(newValue)) {
                newValue = 1;
            }
    
            setSpeed(newValue);
    }

    const onSpeedChangeCommited = () => {
        sendSocketMessage({
            type: 'setSpeed',
            data: speed/100,
        });
    }

    return <div style={{margin: 10, display: "flex", gap: 10, alignItems: "center"}}>
        <Slider 
            value={speed}
            onChange={onSpeedChange}
            onChangeCommitted={onSpeedChangeCommited}
            valueLabelDisplay="auto"
            min={MIN_VALUE}
            max={MAX_VALUE} 
        />
        <TextField
            size='small'
            value={speed}
            onChange={onSpeedChange}
            type='number'
            inputProps={{ min: 1, max: 100}}
        />
    </div>

    
}


export default SpeedControler;