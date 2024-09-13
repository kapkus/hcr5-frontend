const appReducer = {
    updateAxisX: (state, action) => {
        const {x} = action.payload;
        state.x += x;
    },
    loaderPush: (state, action) => {
        const { label, actionType } = action.payload;
        state.loading.push({ label, actionType });
    },
    loaderRemove: (state, action) => {
        const { actionType } = action.payload;
        state.loading = state.loading.filter(item => item.actionType !== actionType);
    },
    setData: (state, action) => {
        state.data = action.payload;
    },
    setError: (state, action) => {
        state.error = action.payload;
    },
};

export default appReducer;