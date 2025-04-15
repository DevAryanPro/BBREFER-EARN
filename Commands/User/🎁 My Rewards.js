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

let rewards = User.getProp("reward_history") || [];
const lastClaim = User.getProp("last_bonus_time");
const now = Date.now();
const SECONDS_24H = 24 * 60 * 60 * 1000;

if (rewards.length === 0) {
  Bot.sendMessage("<b>🎁 You don’t have any rewards yet.</b>\n\n<i>Start claiming bonuses to fill this list!</i>", {
    parse_mode: "HTML"
  });
  return;
}

let msg = "<b>🎁 My Rewards</b>\n\n";
let validRewards = []; // Array to hold valid rewards

for (let i = 0; i < rewards.length; i++) {
  let reward = rewards[i];
  if (reward.type === "Daily Bonus") {
    // Check if the bonus was claimed within the last 24 hours
    if (lastClaim && (now - lastClaim < SECONDS_24H)) {
      validRewards.push(reward);
    }
  } else {
    validRewards.push(reward); // Include other reward types
  }
}

if (validRewards.length === 0) {
    Bot.sendMessage("<b>🎁 You don’t have any rewards yet.</b>\n\n<i>Start claiming bonuses to fill this list!</i>", {
      parse_mode: "HTML"
    });
    return;
  }


for (let i = 0; i < validRewards.length; i++) {
  let reward = validRewards[i];
  msg += "<b>" + (i + 1) + ".</b> <i>" + reward.type + "</i>\n" +
         "    💸 <b>Amount:</b> <i>" + reward.amount + " ₿</i>\n" +
         "    🕐 <b>Date:</b> <i>" + reward.time + "</i>\n\n";
}

Bot.sendMessage(msg, { parse_mode: "HTML" });
