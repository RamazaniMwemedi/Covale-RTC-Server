const Chat = require("../model/chat");
const Messege = require("../model/message");
// For cheking if users are friends
const checkIfFriends = (user, friend) => {
  // Check if users are friends
  const userId = user._id;
  const friendId = friend._id;

  if (user.friends.includes(friendId) && friend.friends.includes(userId)) {
    return true;
  } else {
    return false;
  }
};

const findChatRoomForFriends = async (user, friend) => {
  console.log(user._id.toString(), friend._id.toString());
  // finding chat exist room for my user and friend
  const userId = user._id;
  const friendId = friend._id;
  const chatRoom = await Chat.findOne({
    $or: [
      {
        createdBY: userId,
        friend: friendId,
      },
      {
        createdBY: friendId,
        friend: userId,
      },
    ],
  });
  console.log(chatRoom);
  if (chatRoom) {
    return chat;
  } else {
    // Create a new chat room
    console.log("Create a new chat room");
    const newChat = new Chat({
      createdBY: user._id,
      friend: friend._id,
    });
    await newChat.save();
    // Save the new chat room to user and friend
    user.chats.push(newChat._id);
    friend.chats.push(newChat._id);
    await user.save();
    await friend.save();
    console.log(newChat);
    return newChat;
  }
};

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
