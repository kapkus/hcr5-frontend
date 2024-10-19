import React, { Suspense } from 'react';
import { Skeleton, Slider, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setStep } from '../../store/user/userSlice';

const MIN_VALUE = 1; 
const MAX_VALUE = 100;

const StepController = () => {
    const userSettings = useSelector((state) => state.user.userSettings);
    const dispatch = useDispatch();

    const onChangeStep = (e) => {
        let newValue = parseInt(e.target.value, 10);

        if (newValue > MAX_VALUE) {
            newValue = MAX_VALUE;
        } else if (newValue < MIN_VALUE || isNaN(newValue)) {
            newValue = 1;
        }
        dispatch(setStep(newValue));
    }

    return <div style={{margin: 10, display: "flex", gap: 10, alignItems: "center"}}>
        <Slider 
            value={userSettings?.step ? userSettings?.step : 1}
            onChange={onChangeStep}
            valueLabelDisplay="auto"
            min={MIN_VALUE}
            max={MAX_VALUE} 
        />
        <TextField
            size='small'
            value={userSettings?.step ? userSettings?.step : 1}
            onChange={onChangeStep}
            type='number'
            inputProps={{ min: 1, max: 100}}
        />
    </div>

    
}


export default StepController;