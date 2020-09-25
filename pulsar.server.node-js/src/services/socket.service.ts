import createIo, { Server as IoServer } from 'socket.io';
import { Server } from 'http';
let io: IoServer;

export function initSockets(server: Server) {
    io = createIo(server);
}

export function sendComments(channelName: string, data: any) {
    io.emit(channelName, data);
}
export function createChatRoom(channelName: string) {
    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on(channelName, (msg) => {
            console.log(msg);
        });
    });
}
