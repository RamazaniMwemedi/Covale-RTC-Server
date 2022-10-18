const User = require("../model/user");
const { sendMessagetoTeam } = require("../modules/teamMessage");

const teamMessageHandler = (socket) => {
  console.log(`User Connected to Team : ${socket.id}`);
  socket.on("join_team_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message_to_team", async (data) => {
    const user = await User.findById(data.userId);
    console.log(data);

    const teamRoomId = data.id;
    const messegeSent = data.newMessage.message;
    const idFromClient = data.newMessage.idFromClient;
    console.log(teamRoomId, messegeSent);
    // Saving messege
    const messege = await sendMessagetoTeam(
      user,
      teamRoomId,
      messegeSent,
      idFromClient
    );
    console.log(messege);
    // // Return the messege to the client
    socket.emit("messege_sent_to_team", messege);

    socket.to(data.id).emit("receive_message_to_team", messege);
  });
};

module.exports = { teamMessageHandler };
