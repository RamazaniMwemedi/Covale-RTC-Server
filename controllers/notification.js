// Notification controller
// Path: controllers\notification.js
const {
  createNotification,
  getNotification,
} = require("../modules/notification");
//
const notificationHandler = (socket) => {
  // Join notification  room
  socket.on("join_notification_room", async (data) => {
    console.log("Joining notification room", data);
    socket.join(data);
  });

  //  send a new notification
  socket.on("send_notification", async (data) => {
    const notification = await createNotification(data);
    console.log("Notification :", notification);

    socket.to(data.recieverId).emit("new_notification", notification);
  });

  // get all notifications
  socket.on("get_notification", async (data) => {
    const notification = await getNotification(data);
    socket.emit("all_notification", notification);
  });
};

module.exports = {
  notificationHandler,
};
