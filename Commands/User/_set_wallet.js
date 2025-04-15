if (!message) {
  Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "💳 <b>Set Your Wallet</b> 💳\n\n" +
  "✍️ <i>Please send your valid BTC address after the command.</i>\n" +
  "📌 Example:\n<code>/set_wallet bc1qxyzabc123...</code>",
  parse_mode: "HTML",
  reply_markup: {
  keyboard: [["⬅️ Back"]],
  resize_keyboard: true
  }
  });
  return;
 }
 

 if (message.length < 10) {
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "🚨 <b>Incorrect wallet address. Please provide a valid BTC address.</b> 🚨",
  parse_mode: "HTML",
  reply_markup: {
  keyboard: [["⬅️ Back"]],
  resize_keyboard: true
  }
  });
  return;
 }
 

 User.setProp("wallet", message, "text");
 

 Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "✅ <b>Your BTC Wallet has been saved successfully!</b> ✅\n\n" +
  "🏦 <b>Wallet:</b> <code>" + message + "</code>", // Display address only
  parse_mode: "HTML",
  reply_markup: {
  keyboard: [["⬅️ Back"]],
  resize_keyboard: true
  }
 });
