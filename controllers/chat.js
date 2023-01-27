const chatMessageHandler = (socket) => {
  socket.on("join_room", async (data) => {
    console.log("Joined Chat Room ID", data);
    socket.join(data);
  });

  socket.on("send_message", async (data) => {
    console.log("Messege :", data);
    console.log("chatRoom :", data.chatRoom);
    socket.to(data.chatRoom).emit("receive_message", data);
  });
};

module.exports = {
  chatMessageHandler,
};
