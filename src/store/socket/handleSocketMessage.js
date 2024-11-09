import { updateStateFromMessage, addNotification, updateServoStatus, updatePosition } from './socketSlice';

const handleSocketMessage = (data, store) => {

    switch (data.type) {
        // case 'update':
        //     store.dispatch(updateStateFromMessage(data));
        //     break;
        case 'notification':
            store.dispatch(addNotification(data.payload));
            break;
        case 'update':
            console.log(data)
            if(!data.value){ return }

            Object.entries(data.value).forEach(([key, value]) => {
                switch (key) {
                    case "position":
                        store.dispatch(updatePosition(value));
                    break;
                    case "servo":
                        store.dispatch(updateServoStatus(value));
                    break;
                }
            });
           
        break;
    }

}

export default handleSocketMessage;