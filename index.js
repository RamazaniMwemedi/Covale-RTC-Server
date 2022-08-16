const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");
const cors = require("cors");
const { errorHandler, userExtractor } = require("./middleware/index");

const User = require("./model/user");
const myModule = require("./modules/messege");

app.use(cors());
app.use(errorHandler);
const server = http.createServer(app);

app.get("/", async(req,res)=>{
  res.send("<h1>Hello there</h1>")
})

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://admin.socket.io","https://covalnt.vercel.app"],
    methods: ["GET", "POST"],
  },
});

// Messaging system
io.on("connection", async (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", async (data) => {
    const user = await User.findById(data.userId);
    console.log(data);

    const chatRoomId = data.id;
    const messegeSent = data.newMessage.message;
    console.log(chatRoomId, messegeSent);
    // Saving messege
    const messege = await myModule.addingMessegeInChatRoom(
      user,
      chatRoomId,
      messegeSent
    );
    console.log(messege);
    // // Return the messege to the client
    socket.emit("messege_sent", messege);

    socket.to(data.id).emit("receive_message", messege);
  });
});

instrument(io, {
  auth: false,
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});