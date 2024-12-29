import { enqueueNotification } from '../../utils/utils';
import { 
    updateStateFromMessage,
    addNotification, 
    updateServoStatus, 
    updatePosition, 
    updateSpeed, 
    setLidarSocketStatus,
    setTcpList
} from './socketSlice';

const handleSocketMessage = (data, store) => {
    
    switch (data.type) {
        case 'notification':
            enqueueNotification(data);
            break;
        case 'update':
            if(!data.value){ return }

            Object.entries(data.value).forEach(([key, value]) => {
                switch (key) {
                    case "position":
                        store.dispatch(updatePosition(value));
                    break;
                    case "servo":
                        store.dispatch(updateServoStatus(value));
                    break;
                    case "speed":
                        console.log(value)
                        store.dispatch(updateSpeed(value));
                    break;
                }
            });
            break;
        case 'lidarSocket': 
            console.log('lidarMsg', data);
            store.dispatch(setLidarSocketStatus(data.value.status))
            break;
        case 'tcpList': 
            console.log('tcpList', data.value);
            store.dispatch(setTcpList(data.value))
            break;
    }

}

export default handleSocketMessage;