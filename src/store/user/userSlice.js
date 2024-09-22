import { createSlice } from '@reduxjs/toolkit';
import userReducer from './reducer';

const initialState = {
	data: {},

	loading: []
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: userReducer,
});

export const { setUserData, setUserError } = userSlice.actions;

export default userSlice.reducer;