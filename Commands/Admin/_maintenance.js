const ADMIN_ID = 7316439041; // 🔁 Replace with your real ID
 const BAN_CHANNEL_ID = -1002672959967; // Replace with your channel ID
 const BROADCAST_USERS_PROP = "broadcast_user_ids";

 if (user.telegramid !== ADMIN_ID) {
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "⛔ <b>Access Denied!</b>",
  parse_mode: "HTML"
  });
  return;
 }

 function broadcastMessage(text) {
  try {
  let userIds = Bot.getProp(BROADCAST_USERS_PROP);
  if (userIds) {
   userIds = JSON.parse(userIds);
   for (let i = 0; i < userIds.length; i++) {
    let userId = userIds[i];
    try {
     Api.sendMessage({
      chat_id: userId,
      text: text,
      parse_mode: "HTML"
     });
    } catch (e) {
     Bot.inspect(`⚠️ <b>Error sending to user</b> <code>${userId}</code>: ${e}`);
    }
   }
  }
  } catch (e) {
  Bot.inspect(`🚨 <b>Error getting user IDs:</b> ${e}`);
  }

  Api.sendMessage({
  chat_id: BAN_CHANNEL_ID,
  text: text,
  parse_mode: "HTML"
  });
 }

 if (message.toLowerCase().includes("on")) {
  Bot.setProp("maintenance_mode", true, "boolean");
  let onMessage = "🛠️ <b><u>System Maintenance</u></b> 🛠️\n\n" +
  "The bot is now under maintenance. 🚧 Some features may be temporarily unavailable. We appreciate your patience. 🙏";
  broadcastMessage(onMessage);
  Api.sendMessage({
   chat_id: chat.chatid,
   text: "✅ <b>Maintenance Mode Enabled!</b> ✅\n\n" +
   "A notification has been sent to all users and the channel.",
   parse_mode: "HTML"
  });

 } else if (message.toLowerCase().includes("off")) {
  Bot.setProp("maintenance_mode", false, "boolean");
  let offMessage = "🎉 <b><u>System Back Online!</u></b> 🎉\n\n" +
  "The bot is now fully operational! All features are restored. Thank you for your patience. 🙌";
  broadcastMessage(offMessage);
  Api.sendMessage({
   chat_id: chat.chatid,
   text: "🎊 <b>Maintenance Mode Disabled!</b> 🎊\n\n" +
   "A notification has been sent to all users and the channel.",
   parse_mode: "HTML"
  });
 } else {
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "ℹ️ <b>Usage:</b>\n/maintenance on\n/maintenance off",
  parse_mode: "HTML"
  });
 }
