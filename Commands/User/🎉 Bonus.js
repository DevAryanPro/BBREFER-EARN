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

const bonus = Libs.ResourcesLib.userRes("BONUS");
const btc = Libs.ResourcesLib.userRes("BTC");

// Bonus amount and cooldown settings
const BONUS_AMOUNT = 0.0000005;
const SECONDS_24H = 24 * 60 * 60;

// Get last claim timestamp
const lastClaim = User.getProp("last_bonus_time");

// Get current time
const now = Date.now();

if (!lastClaim || now - lastClaim >= SECONDS_24H * 1000) {
  // Eligible: Add bonus
  bonus.add(BONUS_AMOUNT);
  btc.add(BONUS_AMOUNT);

  // Save new timestamp
  User.setProp("last_bonus_time", now, "integer");

  // Add to reward history
  let rewardHistory = User.getProp("reward_history") || [];
  rewardHistory.unshift({
    type: "Daily Bonus",
    amount: BONUS_AMOUNT.toFixed(7),
    time: Libs.DateTimeFormat.format(new Date(), "dd mmm YYYY - HH:mm:ss") // Corrected format
  });
  rewardHistory = rewardHistory.slice(0, 10); // Keep only latest 10
  User.setProp("reward_history", rewardHistory, "json");


  // Notify user
  Bot.sendMessage(
    "<b>🎉 Bonus Claimed Successfully!</b>\n\n" +
    "💰 <b>You received:</b> <i>" + BONUS_AMOUNT.toFixed(7) + " ₿</i>\n" +
    "⏳ <i>Come back after 24 hours to claim again.</i>",
    { parse_mode: "HTML" }
  );

  // Schedule notification 24h later
  Bot.run({
    command: "/bonus_notify",
    run_after: SECONDS_24H,
    options: { telegramid: user.telegramid }
  });

} else {
  // Cooldown: calculate remaining time
  const next = lastClaim + SECONDS_24H * 1000;
  const diffSec = Math.floor((next - now) / 1000);
  const hours = String(Math.floor(diffSec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((diffSec % 3600) / 60)).padStart(2, '0');
  const secs = String(diffSec % 60).padStart(2, '0');

  Bot.sendMessage(
    "<b>⏳ Bonus Already Claimed!</b>\n\n" +
    "⛔ <i>You can claim again in:</i>\n" +
    "<b>" + hours + ":" + mins + ":" + secs + "</b>",
    { parse_mode: "HTML" }
  );
}
