import { Socket } from '../../utils/Socket';
import { getAccessToken } from '../../utils/utils';
import { setSocketStatus, updateStateFromMessage, addNotification } from './socketSlice';
import handleSocketMessage from './handleSocketMessage';

let socketInstance;
const reconnectInterval = 5000;

const socketMiddleware = (store) => {
    return (next) => (action) => {
        switch (action.type) {
            case 'socket/initialize':
                if (!socketInstance) {
                    socketInstance = new Socket();
                    store.dispatch(setSocketStatus('onhold'));
                    socketInstance.connect(action.payload.url);

                    socketInstance.on('open', () => {
                        const token = getAccessToken();
                        store.dispatch(setSocketStatus('connected'));
                        sendSocketMessage(JSON.stringify({ type: 'auth', token: token }));
                    });

                    socketInstance.on('message', (event) => {
                        const data = JSON.parse(event.data);
                        handleSocketMessage(data, store);
                    });

                    socketInstance.on('error', (error) => {
                        store.dispatch(setSocketStatus('disconnected'));
                        console.error('WebSocket error:', error);
                    });

                    socketInstance.on('close', () => {
                        store.dispatch(setSocketStatus('disconnected'));
                        socketInstance = null;

                        console.log('WebSocket connection closed');
                        setTimeout(() => {
                            store.dispatch({ type: 'socket/initialize', payload: { url: action.payload.url } });
                        }, reconnectInterval);
                    });
                }
                break;

            case 'socket/send':
                sendSocketMessage(action.payload);
                break;

            default:
                break;
        }
        return next(action);
    };
};

export const sendSocketMessage = (message) => {
    if (socketInstance) {
        socketInstance.send(message);
    } else {
        console.error('WebSocket is not connected');
    }
};

export default socketMiddleware;
