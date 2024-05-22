

export default function socketEvents(io) {
    io.on('connection', (socket) => {
        console.log('A user connected');
    
        socket.on('sendNotification', (data) => {
          console.log(data);
          io.emit('receiveNotification', data);
        });
    
        socket.on('disconnect', () => {
          console.log('A user disconnected');
        });
      });
}