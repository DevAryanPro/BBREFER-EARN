const ADMIN_ID = 7316439041; // 🔁 Replace with your real Telegram ID
const CHANNEL_ID = -1002672959967; // 📢 Replace with your channel ID

if (user.telegramid !== ADMIN_ID) {
  // Check if it's the admin
  return Api.sendMessage({
    chat_id: chat.chatid,
    text: "⛔ <b>Admin Only</b> ⛔\n\nYou are not authorized to use this command.",
    parse_mode: "HTML",
  });
}

if (!params) {
  return Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ <b>Invalid Usage</b> ❌\n\nPlease use the command like this:\n<code>/deny WithdrawalID</code>",
    parse_mode: "HTML",
  });
}

let withdraw_id = params;
let withdrawal_data = Bot.getProp("withdrawal_" + withdraw_id, "json");

if (!withdrawal_data) {
  return Api.sendMessage({
    chat_id: chat.chatid,
    text: "❓ <b>Invalid Withdrawal ID</b> ❓\n\nWithdrawal request not found.",
    parse_mode: "HTML",
  });
}

let amount = withdrawal_data.amount.toFixed(7); // Format amount
let userId = withdrawal_data.user_id;
let formatted_request =
  "💰 <b><u>New Withdrawal Request</u></b> 💰\n\n" +
  "🆔 <b>Withdrawal ID:</b> <code>" +
  withdraw_id +
  "</code>\n" + // Include withdraw_id
  "👤 <b>User:</b> " +
  withdrawal_data.first_name +
  " " +
  (withdrawal_data.last_name || "<i>null</i>") +
  "\n" +
  "🆔 <b>User ID:</b> <code>" +
  userId +
  "</code>\n" +
  "💸 <b>Amount:</b> <code>" +
  amount +
  " ₿</code>\n" +
  "🏦 <b>Wallet:</b> <code>" +
  (withdrawal_data.wallet ? withdrawal_data.wallet : "N/A") +
  "</code>";

// Send denial message to admin
Api.sendMessage({
  chat_id: ADMIN_ID,
  text:
    "❌ <b><u>Withdrawal Denied</u></b> ❌\n\nYou have denied the withdrawal request (ID: <code>" +
    withdraw_id +
    "</code>) for <code>" + // Include withdraw_id
    amount +
    " ₿</code> for user <code>" +
    userId +
    "</code>.",
  parse_mode: "HTML",
});

// Send denial message to channel
Api.sendMessage({
  chat_id: CHANNEL_ID,
  text: formatted_request + "\n\n❌ <b>Status:</b> <b>Denied</b>",
  parse_mode: "HTML",
});

// Send denial message to user
Api.sendMessage({
  chat_id: userId,
  text:
    "💰 <b><u>Withdrawal Denied</u></b> 💰\n\n" +
    "Your withdrawal request (ID: <code>" +
    withdraw_id +
    "</code>) for <code>" + // Include withdraw_id
    amount +
    " ₿</code> has been denied.",
  parse_mode: "HTML",
});

// Clean up (remove the stored request)
Bot.deleteProp("withdrawal_" + withdraw_id);
