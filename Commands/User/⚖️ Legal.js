const ADMIN_ID = 7316439041; // 🔁 Replace with your real Telegram ID

const isAdmin = user.telegramid === ADMIN_ID;
const isMaintenance = Bot.getProp("maintenance_mode") === true;

if (isMaintenance && !isAdmin) {
  Bot.sendMessage(
    "🚧 <b>Maintenance Mode</b>\n\n" +
    "⛔ _The bot is currently under maintenance._\n" +
    "🕒 <b>Please try again later...</b>",
    { parse_mode: "HTML" }
  );
  return; // Stop this command
}

Api.sendMessage({
  chat_id: chat.chatid, // Ensure sending to the current chat
  text:
    "<b>⚖️ _Legal Disclaimer_ ⚖️</b>\n\n" +
    "⚠️ _Please read the following carefully before using this bot._\n\n" +
    "<b>1. <u>Terms of Service</u></b>\n" +
    "By using this bot, you agree to our [Terms of Service](https://example.com/terms). " +
    "These terms govern your use of the bot and its features.\n\n" +
    "<b>2. <u>No Financial Advice</u></b>\n" +
    "The information provided by this bot is for informational and promotional purposes only. " +
    "It is _not_ financial advice. We are not responsible for any financial decisions you make.\n\n" +
    "<b>3. <u>Referral Program</u></b>\n" +
    "The referral program is subject to change or termination at any time without notice. " +
    "Fair usage policies apply, and any abuse of the system may result in account suspension.\n\n" +
    "<b>4. <u>Limitation of Liability</u></b>\n" +
    "We are not liable for any direct, indirect, incidental, consequential, or special damages arising out of or in " +
    "any way connected with your use of this bot.\n\n" +
    "<b>5. <u>Privacy Policy</u></b>\n" +
    "Your data is handled according to our [Privacy Policy](https://example.com/privacy). " +
    "We are committed to protecting your privacy and will not share your personal information with third parties without your consent.\n\n" +
    "<b>6. <u>Changes to Disclaimer</u></b>\n" +
    "We reserve the right to modify or update this disclaimer at any time. " +
    "Your continued use of the bot constitutes acceptance of any changes.\n\n" +
    "<i>If you do not agree with these terms, please discontinue use of the bot.</i>\n\n" +
    "©️ 2024 [Your Company Name]. All rights reserved.",
  parse_mode: "HTML",
  disable_web_page_preview: true
});
