const WebSocket = require('ws'); // from package.json

const webSocketServer = new WebSocket.Server({ port: 8080 }); // run websocket on a port

// Send the event (message)
webSocketServer.on('connection', webSocket => {
  webSocket.on('message', myMessage => {
    console.log('Received:', myMessage);
    myBroadcast(myMessage);
  });
});

// Broadcast the event
function myBroadcast(myMessage) {
  webSocketServer.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(myMessage);
    }
  });
}