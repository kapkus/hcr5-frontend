const userReducer = {
    setUserData: (state, action) => {
        state.data = action.payload;
    },
    setUserError: (state, action) => {
        state.error = action.payload;
    },
};

export default userReducer;