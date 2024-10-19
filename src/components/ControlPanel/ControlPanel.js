import React from 'react';
import ControlRow from './ControlRow';
import "./style.css";
import { useSelector } from 'react-redux';
import StepController from './StepController';
import { useFetchUserQuery } from '../../store/user/userApi';
import LoadingWrapper from '../Utils/LoadingWrapper';

const ControlPanel = () => {
    const { isLoading } = useFetchUserQuery();
    const socketData = useSelector((state) => state.socket);
	
	return (
		<LoadingWrapper isLoading={isLoading} >
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
			</div>		
		</LoadingWrapper>
		
	);
};

export default ControlPanel;
