// /new_ticket
// Handles the initial ticket creation request (Part 1)
// ==========================================================================

const ADMIN_ID = 7316439041; // Replace with your real Telegram ID

const isAdmin = user.telegramid === ADMIN_ID;
const isMaintenance = Bot.getProp("maintenance_mode", false); // Default to false if not set

if (isMaintenance && !isAdmin) {
  Bot.sendMessage(
    "🚧 <b>Maintenance Mode</b> 🚧\n\n" +
    "⛔ <i>The bot is currently under maintenance.</i> ⛔\n" +
    "🕒 <b>Please try again later...</b> 🕒",
    { parse_mode: "HTML" }
  );
  return; // Stop this command
}

// Generate a unique ticket ID
const ticketId = Libs.Random.str(10); // Generates a random string of 10 characters

// Set a temporary user state to indicate we've started ticket creation
User.setProp("awaiting_ticket_creation", {
  active: true,
  created_at: Date.now(),
  ticket_id: ticketId
}, "json");

Api.sendMessage({
  chat_id: chat.chatid,
  text:
    "🎫 <b>Ticket Successfully Generated!</b> 🎫\n\n" +
    "Please write your question below:\n\n" +
    "<i>⚠️ All messages are reviewed. Please do not spam. Response time is approximately 6 hours. ⚠️</i>",
  parse_mode: "HTML"
});

// Schedule the second part of the command to run immediately
Bot.run({
  command: "/new_ticket_part2", // Fixed command name
  run_after: 1, // Run after 1 second
  options: { ticketId: ticketId } // Pass ticketId to the next part
});
