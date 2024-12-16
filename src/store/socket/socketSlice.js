import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	x: 0,
	y: 0,
	z: 0,
	step: 1,
	holdInterval: 100,
	notifications: [],
	loading: [],
	status: 'disconnected',
	lidarSocketStatus: 'disconnected', // tcp lidar connection
	servoStatus: 'off',
	speed: 0
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
		updateAxisX: (state, action) => {
			state.x = action.payload;
		},
		loaderPush: (state, action) => {
			state.loading.push(action.payload);
		},
		loaderRemove: (state, action) => {
			state.loading = state.loading.filter(item => item !== action.payload);
		},
		addNotification: (state, action) => {
			state.notifications.push(action.payload);
		},
		setSocketStatus: (state, action) => {
			state.status = action.payload;
		},
		setLidarSocketStatus: (state, action) => {
			state.lidarSocketStatus = action.payload;
		},
		updateStateFromMessage: (state, action) => {
			state.x = action.payload.x;
			state.y = action.payload.y;
			state.z = action.payload.z;
		},
		updatePosition: (state, action) => {
			state.x = action.payload.x;
			state.y = action.payload.y;
			state.z = action.payload.z;
		},
		updateServoStatus: (state, action) => {
			state.servoStatus = action.payload;
		},
		updateSpeed: (state, action) => {
			state.speed = action.payload;
		}
  	},
});

export const {
	updateAxisX,
	loaderPush,
	loaderRemove,
	addNotification,
	setSocketStatus,
	updateStateFromMessage,
	updateServoStatus,
	updatePosition,
	updateSpeed,
	setLidarSocketStatus
} = socketSlice.actions;

export default socketSlice.reducer;
