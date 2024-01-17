import express from 'express'
import { Server, createServer } from 'http';
import { Server  as Io } from 'socket.io';


class App {
    public app: express.Application
    public server: Server
    private socketIo: Io

    constructor() {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new Io(this.server, {
            cors: { 
                origin: '*'
            }
        });
        // this.socketIo.sockets.length

        this.socketIo.on('connection', socket => {
            console.log('Connected');
            
            socket.on('disconnect', () => {
                console.log('disconnected');
            })
        
            socket.on('message', (message) => {
                const json = {
                    "text": message,
                    "datetime": new Date()
                }
                console.log(json);
                socket.broadcast.emit('message', json)
            })
        })
    }

}

export default App