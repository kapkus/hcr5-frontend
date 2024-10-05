import { getAccessToken } from "./utils"

class Socket {
    constructor() {
      this.socket = null
    }
  
    connect(url) {
      if (!this.socket) {
        const token = getAccessToken();
        this.socket = new WebSocket(`${url}?token=${token}`)
      }
    }
  
    disconnect() {
      if (this.socket) {
        this.socket.close()
        this.socket = null
      }
    }
  
    send(message) {
      if (this.socket) {
        this.socket.send(JSON.stringify(message))
      }
    }
  
    on(eventName, callback) {
      if (this.socket) {
        this.socket.addEventListener(eventName, callback)
      }
    }
  }
  
  export { Socket }