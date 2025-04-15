const ADMIN_ID = 7316439041 // 🔁 Replace with your real Telegram ID

const isAdmin = user.telegramid === ADMIN_ID
const isMaintenance = Bot.getProp("maintenance_mode") === true

if (isMaintenance && !isAdmin) {
  Bot.sendMessage(
    "🚧 <b>Maintenance Mode</b> 🚧\n\n" +
      "⛔ <i>The bot is currently under maintenance.</i> ⛔\n" +
      "🕒 <b>Please try again later...</b> 🕒",
    { parse_mode: "HTML" }
  )
  return // Stop this command
}

// Send the main text message
Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "<b>🛠️ <u>Support Center</u> 🛠️</b>\n\n" +
    "👋 <i>Hello! How can we assist you today?</i> 👋\n\n" +
    "We offer two convenient ways to get support:\n\n" +
    "🎫 <b><u>Create a Ticket:</u></b> For detailed issues or inquiries that require tracking. 🎫\n\n" +
    "💬 <b><u>Message Support:</u></b> For quick questions or immediate assistance.",
  parse_mode: "HTML"
})

// Send the keyboard
Api.sendMessage({
  chat_id: chat.chatid,
  text: "Choose an option:", // You can adjust this text or leave it empty
  reply_markup: {
    keyboard: [["⬅️ Back"]], // Using an arrow emoji for "Back"
    resize_keyboard: true
  }
})

// Send the inline keyboard
Api.sendMessage({
  chat_id: chat.chatid,
  text: "Select a support method:", // You can adjust this text or leave it empty
  reply_markup: {
    inline_keyboard: [
      [
        { text: "🎫 Create Ticket", callback_data: "/new_ticket" },
        { text: "💬 Message Support", callback_data: "/message_support" }
      ]
    ]
  }
})
