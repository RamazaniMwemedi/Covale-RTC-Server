const User = require("../model/user");
const { sendMessagetoTeam } = require("../modules/teamMessage");

const teamMessageHandler = (socket) => {
  console.log(`User Connected to Team the team : ${socket.id}`);
  socket.on("join_team_room", (data) => {
    console.log("Joined Team ID", data);
    socket.join(data);
  });

  socket.on("send_message_to_team", async (data) => {
    console.log(data);

    socket.to(data.teamId).emit("receive_message_to_team", data);
  });
};

module.exports = { teamMessageHandler };
