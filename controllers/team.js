const User = require("../model/user");
const { sendMessagetoTeam } = require("../modules/teamMessage");

const teamMessageHandler = (socket) => {
  console.log(`User Connected to Team the team: ${socket.id}`);
  socket.on("join_team_room", (data) => {
    console.log("Joined", data);
    socket.join(data);
  });

  socket.on("send_message_to_team", async (data) => {
    console.log("data  from client");
    console.log(data);
    const user = await User.findById(data.userId);

    const teamRoomId = data.id;
    const messegeSent = data.teamNewMessage.message;
    const idFromClient = data.teamNewMessage.idFromClient;
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
  // New messege
  socket.on("new_message_to_team", (data) => {
    console.log("New Messege");
    console.log(data);
    socket.to(data.id).emit("receive_message_to_team", data);
  });
};

module.exports = { teamMessageHandler };
