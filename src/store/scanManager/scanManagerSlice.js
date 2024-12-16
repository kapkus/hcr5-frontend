import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	items: [],

}

const appSlice = createSlice({
	name: 'scanManager',
	initialState: initialState,
	reducers: {
		fetchScansSuccess: (state, action) => {
			state.items = action.payload
		}
	},
});

export const { fetchScansSuccess } = appSlice.actions;

export default appSlice.reducer;