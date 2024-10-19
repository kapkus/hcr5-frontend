import { createSlice } from '@reduxjs/toolkit';
import { Socket } from '../../utils/Socket';
import { getAccessToken } from '../../utils/utils';
import socketReducer from './reducer';

const initialState = {
	x: 0,
	y: 0,
	z: 0,
	step: 1,
	holdInterval: 100,
	notifications: [],
	loading: [],
	status: 'disconnected'
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
		updateStateFromMessage: (state, action) => {
			state.x = action.payload.x;
			state.y = action.payload.y;
			state.z = action.payload.z;
		}
  	},
});

export const {
	updateAxisX,
	loaderPush,
	loaderRemove,
	addNotification,
	setSocketStatus,
	updateStateFromMessage
} = socketSlice.actions;

export default socketSlice.reducer;
