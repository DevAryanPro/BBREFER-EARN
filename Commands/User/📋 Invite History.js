//  /invite_history command

 const REFS_PER_PAGE = 10;

 if (!user.refList || !user.refList.get().length) {
  Api.sendMessage({
  chat_id: chat.chatid,
  text: "😔 <b>You haven't invited anyone yet.</b> 😔",
  parse_mode: "HTML"
  });
  return;
 }

 let refList = user.refList.get();
 let totalRefs = refList.length;

 let page = params ? parseInt(params) : 1;
 if (isNaN(page) || page < 1) {
  page = 1;
 }

 let start = (page - 1) * REFS_PER_PAGE;
 let end = start + REFS_PER_PAGE;
 let currentPageRefs = refList.slice(start, end);

 let message = "<b>👥 Your Invite History 👥</b>\n\n";
 message += `<i>Total Invites:</i> <b>${totalRefs}</b>\n\n`;

 if (currentPageRefs.length) {
  message += "<b><u>Latest Invites:</u></b>\n";
  currentPageRefs.forEach((ref, index) => {
  let formattedDate = Libs.DateTimeFormat.format(
  new Date(ref.reg_date),
  "dd/mm/yyyy HH:MM"
  );
  message += `<span class="math-inline">\{start \+ index \+ 1\}\. <i\></span>{
  ref.first_name || ref.username || "Unknown"
  }</i> - ${formattedDate}\n`;
  });
 } else {
  message += "<i>No invites to show on this page.</i>\n";
 }

 //  Pagination
 let pagination = [];
 let prevPage = page > 1;
 let nextPage = end < totalRefs;

 if (prevPage) {
  pagination.push({ text: "⬅️ Prev", callback_data: `/invite_history ${page - 1}` });
 } else {
  pagination.push({ text: "🚫 Prev", callback_data: "no_prev_page" }); //  Disable button
 }
 if (nextPage) {
  pagination.push({ text: "Next ➡️", callback_data: `/invite_history ${page + 1}` });
 } else {
  pagination.push({ text: "Next 🚫", callback_data: "no_next_page" }); //  Disable button
 }

 let message_id = request.message.message_id; //  Get message ID

 Api.editMessageText({
  chat_id: chat.chatid,
  message_id: message_id,
  text: message,
  parse_mode: "HTML",
  reply_markup: { inline_keyboard: [pagination] }
 });

 //  ---  Callback Handlers for Pagination (Separate Commands) ---

 Bot.onCallbackQuery("no_prev_page", function(msg) {
  Api.answerCallbackQuery({
  callback_query_id: msg.id,
  text: "You are on the first page!",
  show_alert: true
  });
 });

 Bot.onCallbackQuery("no_next_page", function(msg) {
  Api.answerCallbackQuery({
  callback_query_id: msg.id,
  text: "You are on the last page!",
  show_alert: true
  });
 });
