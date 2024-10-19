import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './userApi';

const initialState = {
	data: {
		userId: '', 
		name: '',
		userType: '',
		settings: {}
	},

	userSettings: {
		step: null,
		holdInterval: null
	},

	loading: []
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUserError: (state, action) => {
			state.error = action.payload;
		},
		setStep: (state, action) => {
			state.userSettings.step = action.payload;
		},
		setInterval: (state, action) => {
			state.userSettings.holdInterval = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			userApi.endpoints.fetchUser.matchFulfilled,
			(state, {payload}) => {
				if(payload.settings){
					state.userSettings = payload.settings;
				}
			}
		)
	}
});

export const { setUserError, setInterval, setStep } = userSlice.actions;
export default userSlice.reducer;