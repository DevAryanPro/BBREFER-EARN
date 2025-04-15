const ADMIN_ID = 7316439041; // 🔁 Replace with your real Telegram ID

const isAdmin = user.telegramid === ADMIN_ID;
const isMaintenance = Bot.getProp("maintenance_mode") === true;

if (isMaintenance && !isAdmin) {
  Bot.sendMessage(
    "🚧 <b>Maintenance Mode</b>\n\n" +
    "⛔ <i>The bot is currently under maintenance.</i>\n" +
    "🕒 <b>Please try again later...</b>",
    { parse_mode: "HTML" }
  );
  return; // Stop this command
}


if (!params.telegramid) return;

Api.sendMessage({
  chat_id: params.telegramid,
  text:
    "<b>🎁 Congratulations!</b>\n\n" +
    "🎉 <i>Your next bonus is ready to claim!</i>\n" +
    "💸 Don’t forget to claim it and keep stacking those ₿!",
  parse_mode: "HTML"
});
