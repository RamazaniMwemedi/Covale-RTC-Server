const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const { errorHandler } = require("./middleware/index");
const PORT = process.env.PORT || 3001;

const { chatMessageHandler } = require("./controllers/chat");
const { teamMessageHandler } = require("./controllers/team");
const { notificationHandler } = require("./controllers/notification");

// IO instance
const io = new Server(PORT, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://admin.socket.io",
      "https://coval.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// NameSpaces
const chatNamespace = io.of("/chat");
const teamNameSpace = io.of("/team");
// Notification dinamic namespace
const notificationNameSpace = io.of("/notification");

chatNamespace.on("connection", async (socket) => {
  chatMessageHandler(socket);
});

teamNameSpace.on("connection", async (socket) => {
  teamMessageHandler(socket);
});

notificationNameSpace.on("connection", async (socket) => {
  notificationHandler(socket);
});

instrument(io, {
  auth: false,
  mode: "development",
});
