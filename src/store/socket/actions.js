export const connectSocket = () => ({
    type: 'socket/connect',
  });
  
  export const disconnectSocket = () => ({
    type: 'socket/disconnect',
  });
  
  export const sendRobotCommand = (command) => ({
    type: 'socket/sendCommand',
    payload: command, 
  });