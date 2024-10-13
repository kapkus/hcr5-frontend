const appReducer = {
    updateAxisX: (state, action) => {
        const {x} = action.payload;
        state.x += x;
    },
    // updateAxis: (state, action) => {
    //     const {message} = action.payload;
    //     state.x += x;
    // },
    loaderPush: (state, action) => {
        const { label, actionType } = action.payload;
        state.loading.push({ label, actionType });
    },
    loaderRemove: (state, action) => {
        const { actionType } = action.payload;
        state.loading = state.loading.filter(item => item.actionType !== actionType);
    },
    updateAxes(state, action) {
        const { x, y, z } = action.payload;
        state.x = x;
        state.y = y;
        state.z = z;
    },
};

export default appReducer;