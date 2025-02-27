import React, { useState } from 'react';
import ControlRow from './ControlRow';
import "./style.css";
import { useSelector } from 'react-redux';
import StepController from './SpeedControler';
import { useFetchUserQuery } from '../../store/user/userApi';
import LoadingWrapper from '../Utils/LoadingWrapper';
import HomeButton from './HomeButton';
import { Button } from '@mui/material';
import ServoState from './ServoState';

const ControlPanel = () => {
    // const { isLoading } = useFetchUserQuery();
    const socketData = useSelector((state) => state.socket);
	const isLoading = false;

	

	return (
		<LoadingWrapper isLoading={isLoading} >
			<div>
				<div className={'control-panel-container'}>
					<ControlRow axis={"x"} 
								cord={socketData.x} 
								// setCord={(e) => {handleAxisChange(e, "x")}}
					/>
					<ControlRow axis={"y"} 
								cord={socketData.y} 
								// setCord={(e) => {handleAxisChange(e, "y")}}
					/>
					<ControlRow axis={"z"} 
								cord={socketData.z} 
								// setCord={(e) => {handleAxisChange(e, "z")}}
					/>
					<StepController />
					<div style={{display: "flex", gap: 10}}>
						<HomeButton />
						<ServoState />	
					</div>
				</div>
			</div>
		</LoadingWrapper>
		
	);
};

export default ControlPanel;
