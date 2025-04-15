//  /broadcast command (Admin only)
//  Broadcasts a message to all users with formatting, timestamp, and detailed stats.

const ADMIN_ID = 7316439041 // 🔁 Replace with your real Telegram ID
const BROADCAST_USERS_PROP = "broadcast_user_ids"
const BATCH_SIZE = 10
const BATCH_DELAY = 1000

const isAdmin = user.telegramid === ADMIN_ID
const isMaintenance = Bot.getProp("maintenance_mode") === true

if (isMaintenance && !isAdmin) {
  Api.sendMessage({
    chat_id: chat.chatid,
    text:
      "🚧 <b>Maintenance Mode</b>\n\n" +
      "⛔ <i>The bot is currently under maintenance.</i>\n" +
      "🕒 <b>Please try again later...</b>",
    parse_mode: "HTML"
  })
  return
}

if (!isAdmin) {
  Api.sendMessage({
    chat_id: chat.chatid,
    text:
      "⛔ <b>Access Denied!</b>\n\n<i>Only admins can use this command.</i>",
    parse_mode: "HTML"
  })
  return
}

if (!params) {
  Api.sendMessage({
    chat_id: chat.chatid,
    text: "⚠️ <b>Usage:</b> /broadcast <i>message to send</i>",
    parse_mode: "HTML"
  })
  return
}

//  Get user list
let userIds = Bot.getProp(BROADCAST_USERS_PROP)
if (!userIds) {
  userIds = []
} else {
  userIds = JSON.parse(userIds)
}

let totalUsers = userIds.length
let successCount = 0
let failedCount = 0
let blockedCount = 0
let unknownErrorCount = 0

function sendBroadcast(startIndex) {
  let endIndex = Math.min(startIndex + BATCH_SIZE, totalUsers)
  for (let i = startIndex; i < endIndex; i++) {
    let userId = userIds[i]
    try {
      let now = new Date()
      let dateTimeString =
        now.toLocaleDateString() + " " + now.toLocaleTimeString()

      Api.sendMessage({
        chat_id: userId,
        text: `📢 <b>Broadcast Message from Admin:</b>\n\n<u>${params}</u>\n\n<i>Time: ${dateTimeString}</i>`,
        parse_mode: "HTML",
        disable_notification: true
      })
      successCount++
    } catch (error) {
      failedCount++
      Bot.inspect("Broadcast failed to user: " + userId + " - " + error)

      if (error.message.includes("blocked")) {
        blockedCount++
      } else {
        unknownErrorCount++
      }
    }
  }

  if (endIndex < totalUsers) {
    //  Schedule next batch
    Bot.run({
      command: "/broadcast", //  Reschedule THIS command
      run_after: BATCH_DELAY,
      options: { startIndex: endIndex, originalParams: params }
    })
  } else {
    //  Broadcast complete
    Api.sendMessage({
      chat_id: chat.chatid,
      text: `📣 <b>Broadcast Report</b> 📣\n\n<b>Status:</b> ✅ Done ✅\n📊 <b>Total Users:</b> ${totalUsers}\n✅ <b>Success:</b> ${successCount}\n❌ <b>Failed:</b> ${failedCount}\n🚫 Blocked: ${blockedCount}\n❓ Unknown Error: ${unknownErrorCount}`,
      parse_mode: "HTML"
    })
  }
}

//  Initial call
if (!options || options.startIndex === undefined) {
  sendBroadcast(0)
} else {
  //  Continuing a batch
  sendBroadcast(options.startIndex)
  params = options.originalParams //  Maintain original message
}
