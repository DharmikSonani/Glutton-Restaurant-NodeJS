import io from 'socket.io-client';
import { SOCKET_URL } from './utils';

class WSService {
    initializeSocket = async (url) => {
        try {
            this.socket = io(url ? url : SOCKET_URL, {
                transports: ['websocket']
            })

            this.socket.on("connect", (data) => {
                console.log("socket connecteddd");
            })

            this.socket.on("disconnect", (data) => {
                console.log("socket disconnecteddd");
            })

            this.socket.on("error", (data) => {
                console.log("socket error", data);
            })


        } catch (error) {
            console.log("not initialised");
        }
    }

    emit(event, data = {}) {
        this.socket?.emit(event, data)
    }
    on(event, cb) {
        this.socket?.on(event, cb)
    }
    off(event, cb) {
        this.socket?.off(event, cb)
    }
    removeListener(listenerName) {
        this.socket?.removeListener(listenerName)
    }
}

const socketServices = new WSService()

export default socketServices;