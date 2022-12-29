const User = require("../model/user");
const { sendMessagetoTeam } = require("../modules/teamMessage");

const teamMessageHandler = (socket) => {
  console.log(`User Connected to Team the team: ${socket.id}`);
  socket.on("join_team_room", (data) => {
    console.log("Joined", data);
    socket.join(data);
  });

  socket.on("send_message_to_team", async (data) => {
    console.log(data);
    let message = {};
    const Sender = await User.findById(data.userId);
    const teamRoomId = data.id;
    const messegeSent = data.teamNewMessage.message;
    const idFromClient = data.teamNewMessage.idFromClient;
    console.log(teamRoomId, messegeSent);
    // Saving messege
    const messageFromDB = await sendMessagetoTeam(
      Sender,
      teamRoomId,
      messegeSent,
      idFromClient
    );
    message = {
      id: messageFromDB._id,
      idFromClient: messageFromDB.idFromClient,
      sender: {
        username: Sender.username,
        firstname: Sender.firstname,
        lastname: Sender.lastname,
        id: Sender._id,
      },
      message: messageFromDB.message,
      videos: messageFromDB.videos,
      photos: messageFromDB.photos,
      teamRoom: messageFromDB.teamRoom,
      sentAt: messageFromDB.sentAt,
    };
    // // Return the messege to the client
    socket.emit("messege_sent_to_team", message);

    socket.to(data.id).emit("receive_message_to_team", message);
  });
};

module.exports = { teamMessageHandler };
