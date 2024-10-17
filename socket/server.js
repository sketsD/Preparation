const fs = require("fs");
const https = require("https");
const WebSocket = require("ws");

// openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365 -nodes
const server = https.createServer({
  cert: fs.readFileSync("./cert.pem"),
  key: fs.readFileSync("./key.pem"),
});

const wss = new WebSocket.Server({ server });

let clients = [];

wss.on("connection", (ws) => {
  const user = { id: clients.length + 1, ws: ws };
  ws.on("message", (msg) => {
    const parsedMsg = JSON.parse(msg);
    if (parsedMsg?.type === "userName") {
      user.userName = parsedMsg.userName;
      clients.push(user);
      broadcastOnlineUsers();
      return;
    }
    if (parsedMsg?.exit === "exit") {
      clients = clients.filter((client) => client.ws !== ws);
      broadcastOnlineUsers();
      ws.close();
      return;
    }

    clients.forEach((client) => {
      if (client.ws.readyState === WebSocket.OPEN) {
        client.ws.send(
          JSON.stringify({
            type: "message",
            from: user.userName,
            content: parsedMsg.content,
          })
        );
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter((client) => client.ws !== ws);
    broadcastOnlineUsers();
  });
});

const broadcastOnlineUsers = function () {
  const userList = clients.map((client) => ({
    id: client.id,
    userName: client.userName,
  }));
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(
        JSON.stringify({
          type: "onlineUsers",
          users: userList,
        })
      );
    }
  });
};

server.listen(8080, () => console.log("Server is running on port 8080"));
