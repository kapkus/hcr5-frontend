import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: null,
	waypoints: [], 
	zLevel: 0,
	scanPlanner: false,
	verticalDistance: 10,
	horizontalDistance: 10
}

const scannerSlice = createSlice({
	name: 'scanner',
	initialState: initialState,
	reducers: {
		initWaypointsList: (state) => {
			state.waypoints = [];
		},
		addWaypoint: (state, action) => {
			const newId = state.waypoints.length ? state.waypoints[state.waypoints.length - 1].id + 1 : 1;
			state.waypoints.push({ id: newId, ...action.payload });
		},
		editWaypoint: (state, action) => {
			const index = state.waypoints.findIndex(item => item.id === action.payload.id);
			if (index !== -1) {
				console.log(action.payload)
				state.waypoints[index] = { ...state.waypoints[index], ...action.payload };
			}
		},
		setZLevel: (state, action) => {
			state.zLevel = action.payload;
		},
		deleteWaypoint: (state, action) => {
			state.waypoints = state.waypoints.filter(item => item.id !== action.payload);
		},
		toggleScanPlanner: (state, action) => {
			state.scanPlanner = !state.scanPlanner;
		},
		setVerticalDistance: (state, action) => {
			state.verticalDistance = action.payload;
		},
		setHorizontalDistance: (state, action) => {
			state.horizontalDistance = action.payload;
		},
	},
});

export const { 
	initWaypointsList,
	addWaypoint,
	editWaypoint,
	changeWaypointOrder,
	deleteWaypoint,
	toggleScanPlanner,
	setZLevel,
	setVerticalDistance,
	setHorizontalDistance
} = scannerSlice.actions;

export default scannerSlice.reducer;