const User = require("../model/user");
const myModule = require("../modules/teamMessage");

const teamMessageHandler = (socket) => {
  console.log(`User Connected HANDLER: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message_to_team", async (data) => {
    const user = await User.findById(data.userId);
    console.log(data);

    const teamRoomId = data.id;
    const messegeSent = data.newMessage.message;
    console.log(teamRoomId, messegeSent);
    // Saving messege
    const messege = await myModule.sendMessagetoTeam(
      user,
      teamRoomId,
      messegeSent
    );
    console.log(messege);
    // // Return the messege to the client
    socket.emit("messege_sent_to_team", messege);

    socket.to(data.id).emit("receive_message_to_team", messege);
  });
};

module.exports = {
  chatMessageHandler: teamMessageHandler,
};
