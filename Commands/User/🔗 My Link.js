//  /my_link command
 

 const ADMIN_ID = 7316439041; // 🔁 Replace with your real Telegram ID
 

 const isAdmin = user.telegramid === ADMIN_ID;
 const isMaintenance = Bot.getProp("maintenance_mode", false) === true;
 

 if (isMaintenance && !isAdmin) {
  Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "🚧 <b><u>Maintenance Mode</u></b> 🚧\n\n" +
  "⛔ <i>The bot is currently under maintenance.</i>\n" +
  "🕒 <b>Please try again later...</b>",
  parse_mode: "HTML"
  });
  return;
 }
 

 const refLink = RefLib.getLink(bot.name, "r");
 

 Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "<b>🔗 <u>Your Referral Link</u> 🔗</b>\n\n" +
  "🌟 <i>Share this link with your friends to earn rewards!</i> 🌟\n\n" +
  "👇 <b>Here's your personal referral link:</b> 👇\n" +
  `<i><u>${refLink}</u></i>` +
  "\n\n" +
  "🎁 <i>For every friend who joins using your link, you'll receive exclusive bonuses!</i> 🎁\n" +
  "🚀 <b>Start sharing and growing your network today!</b> 🚀",
  parse_mode: "HTML"
 });
