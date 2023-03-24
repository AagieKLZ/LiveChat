import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port: 6090 });

let msglist = []
console.log("connecting")

// Función a ejecutar cuando se inicializa el servidor
wss.on('connection', function connection(ws) {
  console.log("connected")

  // Función a ejecutar cuando se recibe un mensaje
  ws.on('message', function message(data) {
    const dataString = data.toString()
    const parsedData = JSON.parse(dataString)

    // Función para vaciar el chat
    if (!parsedData.user && parsedData.msg == "clear") {
      msglist = []

      // Función para enviar zumbido a todos los clientes conectados
    } else if (!parsedData.user && parsedData.msg == "zumb") {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ user: undefined, msg: "zumb" }))
        }
      })

      // Función para guardar el mensaje en el array
    } else {
      msglist.push(parsedData)
      console.log({ msglist })
    }

    // Función para enviar el listado de mensajes en el a todos los clientes conectados
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msglist))
      }
    })
  });
});