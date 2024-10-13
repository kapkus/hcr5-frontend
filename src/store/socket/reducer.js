const socketReducer = {
    updateAxisX(state, action) {
        state.x = action.payload;
      },
      loaderPush(state, action) {
        state.loading.push(action.payload);
      },
      loaderRemove(state, action) {
        state.loading = state.loading.filter(item => item !== action.payload);
      },
      addNotification(state, action) {
        state.notifications.push(action.payload);
      },
      updateStateFromMessage(state, action) {
        const { x, y, z } = action.payload;
        state.x = x;
        state.y = y;
        state.z = z;
      },
      setSocketStatus(state, action) {
        state.status = action.payload;
      }
}

export default socketReducer;