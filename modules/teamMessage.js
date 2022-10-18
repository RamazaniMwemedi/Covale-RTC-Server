const Message = require("../model/teamMessage");
const Team = require("../model/team");
const sendMessagetoTeam = async (user, teamRoomId, messege, idFromClient) => {
  const newMessege = new Message({
    sender: user._id,
    message: messege,
    teamRoom: teamRoomId,
    idFromClient: idFromClient,
  });

  const teamRoom = await Team.findById(teamRoomId);
  newMessege.save();
  teamRoom.messages.push(newMessege);
  teamRoom.save();

  return newMessege;
};

module.exports = { sendMessagetoTeam };
