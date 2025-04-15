const ADMIN_ID = 7316439041;
 

 const isAdmin = user.telegramid === ADMIN_ID;
 const isMaintenance = Bot.getProp("maintenance_mode") === true;
 

 if (isMaintenance && !isAdmin) {
  return Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "🚧 <b>Maintenance Mode</b> 🚧\n\n" +
  "⛔ <i>The bot is currently under maintenance.</i> ⛔\n" +
  "🕒 <b>Please try again later...</b> 🕒",
  parse_mode: "HTML"
  });
 }
 

 try {
  const fullName = (user.first_name || "") + " " + (user.last_name || "");
  const username = user.username ? "@" + user.username : "❌ Not set";
  const joinDate = User.getProperty("join_date") || "❓ Unknown";
  const refLink = RefLib.getLink(bot.name, "r");
 

  const btc = Libs.ResourcesLib.userRes("BTC");
  const bonus = Libs.ResourcesLib.userRes("BONUS");
 

  const totalBTC = btc.value().toFixed(7);
  const totalBonus = bonus.value().toFixed(7);
  const totalRefs = RefLib.getRefCount() || 0;
  let wallet = User.getProperty("wallet");
  wallet = wallet ? wallet : "N/A"; // Ensure wallet is not undefined
  const userId = user.telegramid;
 

  User.setProperty("btc_balance", totalBTC, "string");
 

  Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "👤 <b><u>Your Profile Overview</u></b> 👤\n\n" +
  "🆔 <b>User ID:</b> <code>" + userId + "</code>\n" +
  "📛 <b>Full Name:</b> <i>" + fullName.trim() + "</i>\n" +
  "🔗 <b>Username:</b> <i>" + username + "</i>\n" +
  "📅 <b>Joined On:</b> <i>" + joinDate + "</i>\n\n" +
  "💰 <b>Wallet:</b> <code>" + wallet + "</code>\n" + // Display wallet only
  "💸 <b>Total Earnings:</b> <i>" + totalBTC + " ₿</i>\n" +
  "🎁 <b>Total Bonus:</b> <i>" + totalBonus + " ₿</i>\n" +
  "👥 <b>Total Referrals:</b> <i>" + totalRefs + "</i>\n\n" +
  "📣 <b>Affiliate Link:</b>\n<i>" + refLink + "</i>\n\n" +
  "🚀 <i>Keep growing your ₿TC empire!</i>",
  parse_mode: "HTML",
  reply_markup: { keyboard: [["⬅️ Back"]], resize_keyboard: true }
  });
 } catch (error) {
  Bot.inspect(`Error in profile command: ${error}`);
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "⚠️ <b>Error displaying profile. Please try again.</b>",
  parse_mode: "HTML"
  });
 }
