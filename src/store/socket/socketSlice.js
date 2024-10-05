import { createSlice } from '@reduxjs/toolkit';
import { Socket } from '../../utils/Socket';
import { getAccessToken } from '../../utils/utils';

const initialState = {
  x: 0,
  y: 0,
  z: 0,
  step: 1,
  holdInterval: 100,
  notifications: [],
  loading: [],
  status: 'disconnected'
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
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
  },
});

let socketInstance;
const reconnectInterval = 5000;

export const initializeSocket = (url) => (dispatch) => {
  console.log("initializeSocket")
  if (!socketInstance) {
    console.log("socketInstance")
    socketInstance = new Socket();
    dispatch(setSocketStatus('onhold'));
    socketInstance.connect(url);

    socketInstance.on('open', () => {
      const token = getAccessToken();
      dispatch(setSocketStatus('connected'));
      sendSocketMessage(JSON.stringify({type: 'auth', token: token}))
    })

    socketInstance.on('message', (event) => {
      const data = JSON.parse(event.data);
        console.log(data)
      if (data.type === 'update') {
        dispatch(updateStateFromMessage(data.payload));
      } else if (data.type === 'notification') {
        dispatch(addNotification(data.payload));
      }
    });

    socketInstance.on('error', (error) => {
      dispatch(setSocketStatus('disconnected'));

      console.error('WebSocket error:', error);
    });

    socketInstance.on('close', () => {
    console.log("close")

      dispatch(setSocketStatus('disconnected'));
      socketInstance = null;

      console.log('WebSocket connection closed');
      setTimeout(() => {
        console.log("Testttt")
        dispatch(initializeSocket(url));
      }, reconnectInterval);
    });
  }
};

export const sendSocketMessage = (message) => () => {
    if (socketInstance) {
      socketInstance.send(message);
    } else {
      console.error('WebSocket is not connected');
    }
};

export const { updateAxisX, loaderPush, loaderRemove, addNotification, updateStateFromMessage, setSocketStatus } = socketSlice.actions;

export default socketSlice.reducer;
