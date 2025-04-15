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

const refList = Libs.ReferralLib.currentUser.refList.get();
const referralCount = refList.length;
const btc = Libs.ResourcesLib.userRes("BTC");

Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "<b>📈 <i>Your Referral Stats</i> 📈</b>\n\n" +
    "🌟 Here's an overview of your referral activity:\n\n" +
    "<b>👥 <u>Total Referrals:</u></b> <i>" + parseInt(referralCount) + "</i>\n" +
    "💰 <b><u>Total Earned:</u></b> <i>" + btc.value().toFixed(7) + " ₿</i>\n\n" +
    "📢 <i>Keep sharing your referral link to maximize your earnings!</i>\n",
  parse_mode: "HTML"
});
