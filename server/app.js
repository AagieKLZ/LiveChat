import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({host: "192.168.86.50", port: 6090 });

let msglist = []
console.log("connecting")
wss.on('connection', function connection(ws) {
  console.log("connected")
  ws.on('message', function message(data) {
    console.log('received');
    const dataString = data.toString()
    console.log({dataString})
    const parsedData = JSON.parse(dataString)
    console.log(parsedData["msg"])
    if(!parsedData.user && parsedData.msg == "clear"){
      msglist = []
    }else if (!parsedData.user && parsedData.msg == "zumb"){
      wss.clients.forEach(function each(client){
        if (client.readyState === WebSocket.OPEN){
          client.send(JSON.stringify({user: undefined, msg: "zumb"}))
        }
      })
    } else{
      msglist.push(parsedData)
      console.log({msglist})
    }
    wss.clients.forEach(function each(client){
      if (client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify(msglist))
      }
    })
  });

});