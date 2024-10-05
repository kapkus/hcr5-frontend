import React from 'react';
import useWebSocket from 'react-use-websocket';
import ControlRow from './ControlRow';
// import { useStateValue } from '../../store/StateProvider';
import "./style.css";
import StepController from './StepController';
import { useDispatch, useSelector } from 'react-redux';
import {updateAxisX} from "../../store/app/appSlice";
import { sendSocketMessage } from '../../store/socket/socketSlice';
import { Button } from '@mui/material';

const ControlPanel = () => {
	// const [{ app }, dispatch] = useStateValue();
	// const {x, y, z} = app;
	// console.log(app)
	const dispatch = useDispatch();
	const { x, y, z, step, holdInterval, loading } = useSelector((state) => state.app);
	// const socketUrl = 'ws://localhost:8000';

	// const {
	// 	sendMessage,
	// 	lastMessage,
	// 	readyState,
	// } = useWebSocket(socketUrl, {protocols: 'echo-protocol'});

	const handleClick = () => {
		const msg = {
			forwarded: true,
			type: "moveAxis",
			message: "blablabla"
		}
		dispatch(sendSocketMessage(msg))
		// sendMessage(JSON.stringify(msg));
	};

	console.log(x, y, z)

	return (
		<div className={'control-panel-container'}>
			<Button onClick={handleClick}>test</Button>
			<ControlRow axis={"x"} 
						cord={x} 
						// setCord={(e) => {handleAxisChange(e, "x")}}
			/>
			<ControlRow axis={"y"} 
						cord={y} 
						// setCord={(e) => {handleAxisChange(e, "y")}}
			/>
			<ControlRow axis={"z"} 
						cord={z} 
						// setCord={(e) => {handleAxisChange(e, "z")}}
			/>
			<StepController />
		</div>		
	);
};

export default ControlPanel;
