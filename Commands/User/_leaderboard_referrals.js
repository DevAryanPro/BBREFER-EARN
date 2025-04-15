//  /leaderboard_referrals command

 const LEADERBOARD_SIZE = 10;

 let message = "🏆 <b>Top Referrers Leaderboard</b> 🏆\n\n";

 if (Libs.ReferralLib && Libs.ReferralLib.topList) { //  Safety check
  //  Get total count first
  let totalTopUsers = Libs.ReferralLib.topList.count();
  let topRefUsers = totalTopUsers > 0 ? Libs.ReferralLib.topList.get(LEADERBOARD_SIZE) : [];

  let page = params ? parseInt(params) : 1;
  if (isNaN(page) || page < 1) {
  page = 1;
  }

  let start = (page - 1) * LEADERBOARD_SIZE;
  let end = Math.min(start + LEADERBOARD_SIZE, totalTopUsers);

  if (totalTopUsers > 0 && topRefUsers.length > 0) {
  message += "🏅 <i>Top 10 Users with Most Referrals</i> 🏅\n\n";
  for (let i = start; i < end; i++) {
  let user = topRefUsers[i];
  if (user) {
  message += `<span class="math-inline">\{i \+ 1\}\. 👤 <b\></span>{
  user.first_name || user.username || "Unknown"
  }</b> 🔗 - <i>${user.ref_count}</i>\n`;
  }
  }
  } else {
  message +=
  "😔 <b>Currently, no referrers found.</b> 😔\n\n" +
  "🚀 <i>It's your time to shine!</i> Start referring friends to see your name on the leaderboard! 🚀";
  }

  //  Pagination
  let pagination = [];
  let prevPage = page > 1;
  let nextPage = end < totalTopUsers;

  if (prevPage) {
  pagination.push({ text: "⬅️ Prev", callback_data: `/leaderboard_referrals ${page - 1}` });
  } else {
  pagination.push({ text: "🚫 Prev", callback_data: "no_prev_leaderboard" });
  }
  if (nextPage && totalTopUsers > 0) {
  pagination.push({ text: "Next ➡️", callback_data: `/leaderboard_referrals ${page + 1}` });
  } else {
  pagination.push({ text: "Next 🚫", callback_data: "no_next_leaderboard" });
  }

  let message_id = request.message.message_id;

  Api.editMessageText({
  chat_id: chat.chatid,
  message_id: message_id,
  text: message,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [pagination] }
  });

  //  ---  Callback Handlers for Pagination ---

  Bot.onCallbackQuery("no_prev_leaderboard", function(msg) {
  Api.answerCallbackQuery({
  callback_query_id: msg.id,
  text: "You are on the first page!",
  show_alert: true
  });
  });

  Bot.onCallbackQuery("no_next_leaderboard", function(msg) {
  Api.answerCallbackQuery({
  callback_query_id: msg.id,
  text: totalTopUsers > 0 ? "You are on the last page!" : "No more pages!",
  show_alert: true
  });
  });
 } else {
  //  Libs.ReferralLib or Libs.ReferralLib.topList is not available
  message += "⚠️ <b>Leaderboard is currently unavailable.</b> ⚠️\n\n";
  message += "<i>Please try again later.</i>";

  Api.sendMessage({
  chat_id: chat.chatid,
  text: message,
  parse_mode: "HTML"
  });
 }
