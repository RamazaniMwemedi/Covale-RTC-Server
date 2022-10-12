const Message = require("../model/message");
const Team = require("../model/team");
const sendMessagetoTeam = async (user, teamRoomId, messege) => {
  const newMessege = new Message({
    sender: user._id,
    message: messege,
    teamRoom: teamRoomId,
  });

  const teamRoom = await Team.findById(teamRoomId);
  newMessege.save();
  teamRoom.messege.push(newMessege);
  teamRoom.save();

  return newMessege;
};

module.exports = { sendMessagetoTeam };
