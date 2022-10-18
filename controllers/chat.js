const User = require("../model/user");
const myModule = require("../modules/messege");

const chatMessageHandler = (socket) => {
  console.log(`User Connected to Chat : ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", async (data) => {

    const user = await User.findById(data.userId);
    console.log(data);

    const chatRoomId = data.id;
    const messegeSent = data.newMessage.message;
    const idFromClient = data.newMessage.idFromClient;
    console.log(chatRoomId, messegeSent, idFromClient);
    // Saving messege
    const messege = await myModule.addingMessegeInChatRoom(
      user,
      chatRoomId,
      messegeSent,
      idFromClient
    );
    console.log(messege);
    // // Return the messege to the client
    socket.emit("messege_sent", messege);

    socket.to(data.id).emit("receive_message", messege);
  });
};

module.exports = {
  chatMessageHandler,
};
