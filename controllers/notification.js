const notificationHandler = (socket) => {
  // Join notification  room
  socket.on("join_notification_room", async (data) => {
    console.log("Joining notification room", data);
    socket.join(data);
  });

  //  send a new notification
  socket.on("send_notification", async (data) => {
    console.log("Notification :", data);
    socket.to(data.receiver).emit("new_notification", data);
  });
};

module.exports = {
  notificationHandler,
};
