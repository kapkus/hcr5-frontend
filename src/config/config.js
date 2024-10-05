export default {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost',
    API_PORT: process.env.REACT_APP_API_PORT || 8000,

    WSS_URL: process.env.REACT_APP_WSS_URL || 'wss://localhost',
    WSS_PORT: process.env.REACT_APP_WSS_PORT || 8000
}