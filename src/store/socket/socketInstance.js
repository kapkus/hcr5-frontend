import { Socket } from '../../utils/Socket';
import { setSocketStatus, updateStateFromMessage, addNotification } from './socketSlice';
import { getAccessToken } from '../../utils/utils';

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
        if (data.type === 'update') {
          // console.log(data)
          dispatch(updateStateFromMessage(data));
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