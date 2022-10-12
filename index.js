const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");
const { errorHandler, userExtractor } = require("./middleware/index");


const { chatMessageHandler } = require("./controllers/chat");

app.use(cors());
app.use(errorHandler);
const server = http.createServer(app);

app.get("/", async (req, res) => {
  res.send("<h1>Hello there</h1>");
});

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "https://coval.vercel.app",
    ],
    methods: ["GET", "POST"],
  },
});

// Messaging system
io.on("connection", async (socket) => {
  chatMessageHandler(socket);
});

instrument(io, {
  auth: false,
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
