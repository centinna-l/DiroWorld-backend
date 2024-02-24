const { llm } = require("./helpers");
const app = require("./app");
const httpServer = require("http").Server(app);
const socketio = require("socket.io");
const socketOptions = {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
};

const io = socketio(httpServer, socketOptions);

io.on("connection", async (socket) => {
  //   console.log(socket);
  //   console.log(socket.handshake.query);
  //   console.log(socket.handshake.query.token);

  socket.on("diro-world", async (data) => {
    const { message } = data;
    console.log("message: ", message);
    const promptResponse = await llm(message);
    io.emit("message", {
      message: promptResponse.message,
    });
  });
});

app.set("sockets", io);

module.exports = httpServer;
