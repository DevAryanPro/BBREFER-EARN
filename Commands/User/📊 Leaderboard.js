//  /leaderboard command (or whatever command you use for "📊 Leaderboard")

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
  "<b>🏆 <i>Leaderboard</i> 🏆</b>\n\n" +
  "Explore the top performers!\nChoose how to view the leaderboard:",
  parse_mode: "HTML",
  reply_markup: {
  inline_keyboard: [
  [
  { text: "👥 Referrals", callback_data: "/leaderboard_referrals" }
  ]
  ]
  }
 });
