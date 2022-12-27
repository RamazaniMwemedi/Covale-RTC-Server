const User = require("../model/user");
const myModule = require("../modules/messege");

const chatMessageHandler = (socket) => {
  socket.on("join_room", async (data) => {
    socket.join(data);
  });

  socket.on("send_message", async (data) => {
    const user = await User.findById(data.userId);

    const chatRoomId = data.id;
    const messegeSent = data.newMessage.message;
    const idFromClient = data.newMessage.idFromClient;
    // Saving messege
    const messege = await myModule.addingMessegeInChatRoom(
      user,
      chatRoomId,
      messegeSent,
      idFromClient
    );
    console.log("Messege :", messege);
    // // Return the messege to the client
    socket.emit("messege_sent", messege);

    socket.to(chatRoomId).emit("receive_message", messege);
  });
};

module.exports = {
  chatMessageHandler,
};
