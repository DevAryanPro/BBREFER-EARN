const wallet = User.getProp("wallet");

let text =
  "💰 <b>Withdrawal Request</b> 💰\n\n" +
  "🏦 <b>Wallet:</b> " +
  (wallet ? "<code>" + wallet + "</code>" : "⚙️ <i>Not set</i> - Use /set_wallet") +
  "\n" +
  "🔢 Enter the amount (₿) you want to withdraw:\n" +
  "🔻 Minimum: 0.0000001 ₿\n\n" +
  "✍️ Use the command:\n" +
  "<code>/withdraw Amount</code>\n" +
  "<i>Example:</i> <code>/withdraw 0.0000001</code>";

let keyboard = {
  inline_keyboard: [[{ text: "🔙 Back", callback_data: "back_to_menu" }]], // Replace "back_to_menu" with your actual callback
};

Api.sendMessage({
  chat_id: chat.chatid,
  text: text,
  parse_mode: "HTML",
  reply_markup: keyboard,
});
