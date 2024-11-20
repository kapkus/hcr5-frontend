import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	error: null,
	waypoints: [],
	scanPlanner: false
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
		// changeWaypointOrder: (state, action) => {
		// 	const { id, newPosition } = action.payload;
		// 	const index = state.waypoints.findIndex(item => item.id === id);
		// 	if (index !== -1) {
		// 		const [movedItem] = state.waypoints.splice(index, 1);
		// 		state.waypoints.splice(newPosition, 0, movedItem);
		// 	}
		// },
		deleteWaypoint: (state, action) => {
			state.waypoints = state.waypoints.filter(item => item.id !== action.payload);
		},
		toggleScanPlanner: (state, action) => {
			state.scanPlanner = !state.scanPlanner;
		}
	},
});

export const { 
	initWaypointsList,
	addWaypoint,
	editWaypoint,
	changeWaypointOrder,
	deleteWaypoint,
	toggleScanPlanner
} = scannerSlice.actions;

export default scannerSlice.reducer;