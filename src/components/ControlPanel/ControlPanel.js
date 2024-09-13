import React from 'react';
import useWebSocket from 'react-use-websocket';
import ControlRow from './ControlRow';
// import { useStateValue } from '../../store/StateProvider';
import "./style.css";
import StepController from './StepController';
import { useDispatch, useSelector } from 'react-redux';
import {updateAxisX} from "../../store/app/appSlice";

const ControlPanel = () => {
	// const [{ app }, dispatch] = useStateValue();
	// const {x, y, z} = app;
	// console.log(app)
	const dispatch = useDispatch();
	const { x, y, z, step, holdInterval, loading } = useSelector((state) => state.app);
	const socketUrl = 'ws://localhost:8000';

	const {
		sendMessage,
		lastMessage,
		readyState,
	} = useWebSocket(socketUrl, {protocols: 'echo-protocol'});

	const handleClick = () => {
		const msg = {
			type: "moveAxis",
			message: "blablabla"
		}
		sendMessage(JSON.stringify(msg));
	};

	const handleAxisChange = (direction, axis) => {
		const value = step * direction;
		switch(axis){
			case "x":
				dispatch(updateAxisX({x: value}));
			break;
			case "y":

			break;
			case "z":

			break;
		}
	}

	console.log(x, y, z)

	return (
		<div className={'control-panel-container'}>
			<ControlRow label={"x"} 
						cord={x} 
						setCord={(e) => {handleAxisChange(e, "x")}}
			/>
			<ControlRow label={"y"} 
						cord={y} 
						setCord={(e) => {handleAxisChange(e, "y")}}
			/>
			<ControlRow label={"z"} 
						cord={z} 
						setCord={(e) => {handleAxisChange(e, "z")}}
			/>
			<StepController />
		</div>		
	);
};

export default ControlPanel;
