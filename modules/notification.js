const Notification = require("../model/notification");
const User = require("../model/user");

const createNotification = async ({
  senderId,
  recieverId,
  typeofNotification,
  notifiHead,
  notifiBody,
  link,
}) => {
  const notification = new Notification({
    receiver: recieverId,
    sender: senderId,
    typeof: typeofNotification,
    head: notifiHead,
    body: notifiBody,
    link: link,
  });
  await notification.save();
  return notification;
};

const getNotification = async (data) => {
  const notification = await Notification.find({ receiver: data.userId })
    .populate("sender", { username: 1, profilePicture: 1 })
    .sort({ sentAt: -1 });
  return notification;
};

module.exports = {
  createNotification,
  getNotification,
};
