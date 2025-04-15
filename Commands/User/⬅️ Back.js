//  /start command
 

 const BROADCAST_USERS_PROP = "broadcast_user_ids"
 const BTC_PER_REFERRAL = 0.000001
 const BOT_NAME = Bot.getProperty("bot_name")
 

 //  ---  Store User IDs ---
 try {
  let userIds = Bot.getProp(BROADCAST_USERS_PROP)
  if (!userIds) {
  userIds = []
  } else {
  userIds = JSON.parse(userIds)
  }
 

  if (!userIds.includes(user.telegramid)) {
  userIds.push(user.telegramid)
  Bot.setProp(BROADCAST_USERS_PROP, JSON.stringify(userIds))
  }
 } catch (error) {
  Bot.inspect("Error storing user ID: " + error)
 }
 

 //  ---  Referral Tracking ---
 Libs.ReferralLib.currentUser.track({
  onTouchOwnLink: function() {
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "⚠️ <b>You clicked your <u>own</u> referral link!</b> ⚠️",
  parse_mode: "HTML"
  })
  },
  onAlreadyAttracted: function() {
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "ℹ️ <b>You have <u>already</u> been referred.</b>",
  parse_mode: "HTML"
  })
  },
  onAttractedByUser: function(refUser) {
  try {
  //  Message to the new user
  Api.sendMessage({
  chat_id: chat.chatid,
  text:
  "🌟 <b>Welcome to the team!</b> 🌟\n\n" +
  "🤝 You were invited by: <b>" +
  (refUser.first_name || refUser.username || "Someone") +
  "</b>\n\n" +
  "🚀 <i>Let’s embark on your earning journey!</i> 🚀",
  parse_mode: "HTML"
  })
 

  //  Message to the referrer
  Api.sendMessage({
  chat_id: refUser.chatid,
  text:
  "🎉 <b>New Referral Alert!</b> 🎉\n\n" +
  "🥳 You just got a new referral!\n\n" +
  "👤 <b>Referred User Details:</b>\n" +
  "  Name: <i>" +
  (user.first_name || user.username || "New User") +
  "</i>\n" +
  "  Telegram ID: <i>" +
  user.telegramid +
  "</i>\n\n" +
  `💰 <b>You've received:</b> <u>${BTC_PER_REFERRAL.toFixed(
  8
  )} ₿</u>\n` +
  "✅ <i>Your BTC balance has been updated.</i>",
  parse_mode: "HTML"
  })
 

  //  Reward the referrer
  const btc = Libs.ResourcesLib.anotherUserRes("BTC", refUser.telegramid)
  const bonus = Libs.ResourcesLib.anotherUserRes(
  "BONUS",
  refUser.telegramid
  )
  btc.add(BTC_PER_REFERRAL)
  bonus.add(BTC_PER_REFERRAL)
 

  //  Update totalBTC
  let totalBtc = User.getProperty("totalBTC", 0)
  totalBtc += BTC_PER_REFERRAL
  User.setProperty("totalBTC", totalBtc)
  } catch (error) {
  Bot.inspect("Referral error: " + error)
  }
  }
 })
 

 //  ---  Join Date ---
 try {
  if (!User.getProp("join_date")) {
  let now = new Date()
  let formatted = Libs.DateTimeFormat.format(now, "dddd, mmmm dS - HH:MM:ss")
  User.setProp("join_date", formatted, "text")
  }
 } catch (error) {
  Bot.inspect("Error setting join date: " + error)
 }
 

 //  ---  Welcome Messages ---
 try {
  Api.sendPhoto({
  chat_id: chat.chatid,
  photo: "https://i.imgur.com/U4Qq7vg.jpg",
  caption:
  "👋 <b>Welcome to <u>Refer & Earn</u> Bot!</b> 👋\n\n" +
  "💰 <i>Earn rewards by inviting your friends</i>\n" +
  "📢 Share your link, grow your network, and get <b>exclusive bonuses!</b>\n\n" +
  "🏆 Let’s start your journey to success 🏆\n\n" +
  "❤️ Made by @kaiiddo",
  parse_mode: "HTML",
  reply_markup: {
  inline_keyboard: [[{ text: "👨‍💻 Developer", url: "https://t.me/kaiiddo" }]]
  }
  })
 

  //  Get referral link and send keyboard
  let refLink = Libs.ReferralLib.currentUser.getRefLink(BOT_NAME)
  Api.sendMessage({
  chat_id: chat.chatid,
  text: `👇 <b>Your Referral Link:</b> 👇\n${refLink}`,
  parse_mode: "HTML",
  reply_markup: {
  keyboard: [
  ["🔗 My Link", "🎁 My Rewards"],
  ["📊 Leaderboard", "💸 Withdraw", "👥 Referrals"],
  ["🎉 Bonus", "📋 Invite History"],
  ["💼 Profile", "⚖️ Legal", "🛠 Support"],
  ["ℹ️ About Bot"]
  ],
  resize_keyboard: true
  }
  })
 } catch (error) {
  Bot.inspect("Error sending welcome: " + error)
 }
