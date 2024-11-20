import { enqueueNotification } from '../../utils/utils';
import { updateStateFromMessage, addNotification, updateServoStatus, updatePosition, updateSpeed } from './socketSlice';

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
    }

}

export default handleSocketMessage;