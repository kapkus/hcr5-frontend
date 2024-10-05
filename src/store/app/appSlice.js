import { createSlice } from '@reduxjs/toolkit';
import appReducer from './reducer';

const initialState = {
	x: 0,
	y: 0,
	z: 0,
	

	notifications: [],
	loading: []
}

const appSlice = createSlice({
	name: 'app',
	initialState: initialState,
	reducers: appReducer,
});

export const { updateAxisX, loaderPush, loaderRemove } = appSlice.actions;

export default appSlice.reducer;