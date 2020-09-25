import app from './app';
import * as StreamSockets from './services/socket.service';

export const server = app.listen(app.get('port'), () => {
    console.log(`Server Started on port: ${app.get('port')}`);
});

StreamSockets.initSockets(server);
