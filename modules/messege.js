const Chat = require("../model/chat");
const Messege = require("../model/message");
// For cheking if users are friends


const addingMessegeInChat = async (user, friend, chatRoomId, messege) => {
  const newMessege = new Messege({
    sender: user._id,
    receiver: friend._id,
    message: messege,
    chatRoom: chatRoomId,
  });

  const chatRoom = await Chat.findById(chatRoomId);

  await newMessege.save();
  chatRoom.messege.push(newMessege);
  chatRoom.save();

  return newMessege;
};

const addingMessegeInChatRoom = async (user, chatRoomId, messege) => {
  const newMessege = new Messege({
    sender: user._id,
    message: messege,
    chatRoom: chatRoomId,
  });

  const chatRoom = await Chat.findById(chatRoomId);
  newMessege.save();
  chatRoom.messege.push(newMessege);
  chatRoom.save();

  return newMessege;
};



module.exports = {
  checkIfFriends,
  findChatRoomForFriends,
  addingMessegeInChat,
  addingMessegeInChatRoom,
};
