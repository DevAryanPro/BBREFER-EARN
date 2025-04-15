//  /about command (or whatever command you use for "📎 About Bot")

 const ADMIN_ID = 7316439041; // 🔁 Replace with your real Telegram ID

 const isAdmin = user.telegramid === ADMIN_ID;
 const isMaintenance = Bot.getProp("maintenance_mode") === true;

 if (isMaintenance && !isAdmin) {
  Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "🚧 <b>Maintenance Mode</b>\n\n" +
  "⛔ <i>The bot is currently under maintenance.</i>\n" +
  "🕒 <b>Please try again later...</b>",
  parse_mode: "HTML"
  });
  return; // Stop this command
 }

 Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "<b>🤖 <i>About This Bot</i> 🤖</b>\n\n" +
  "<i>Welcome to our referral rewards bot!</i>\n\n" +
  "<i>We're here to help you earn rewards by sharing our platform with your friends.</i>\n\n" +
  "<i>Simply use your unique referral link to invite new users, and you'll receive bonuses as your network grows.</i>\n\n" +
  "<i>Enjoy the journey and happy earning!</i>",
  parse_mode: "HTML"
 });
