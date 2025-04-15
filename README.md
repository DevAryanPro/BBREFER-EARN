#   Cryptocurrency Refer&Earn Bot

This bot provides a comprehensive system for managing cryptocurrency withdrawal requests within Telegram. It offers a user-friendly interface for submitting requests and an efficient system for administrators to process them.

##   Table of Contents

1.  [   User Commands](#user-commands)
2.  [   Admin Commands](#admin-commands)

##   User Commands

###   🔗 My Link

* **Purpose:** Displays the user's referral statistics, including total referrals and total earnings.
* **Description:** This command provides users with an overview of their referral activity within the bot. It shows the number of users they have referred and the total amount they have earned through referrals. The command also includes a check for maintenance mode, preventing non-admins from using it during maintenance periods.
* **Example:** (This command doesn't take parameters, so it's simply) `/my_link`
* **Code Snippet:**

    ```javascript
    const ADMIN_ID = 7316439041; //  Replace with your real Telegram ID

    const isAdmin = user.telegramid === ADMIN_ID;
    const isMaintenance = Bot.getProp("maintenance_mode") === true;

    if (isMaintenance && !isAdmin) {
      Api.sendMessage({
        chat_id: chat.chatid,
        text:
          "🚧 <b>Maintenance Mode</b>\n\n" +
          "⛔ <i>The bot is currently under maintenance.</i>\n" +
          "🕒 <b>Please try again later...</b>",
        parse_mode: "HTML"
      });
      return; //  Stop this command
    }

    const refList = Libs.ReferralLib.currentUser.refList.get();
    const referralCount = refList.length;
    const btc = Libs.ResourcesLib.userRes("BTC");

    Api.sendMessage({
      chat_id: chat.chatid,
      text:
        "<b>📈  <i>Your Referral Stats</i>  📈</b>\n\n" +
        "🌟 Here's an overview of your referral activity:\n\n" +
        "<b>👥  <u>Total Referrals:</u></b>  <i>" + parseInt(referralCount) + "</i>\n" +
        "💰  <b><u>Total Earned:</u></b>  <i>" + btc.value().toFixed(7) + " ₿</i>\n\n" +
        "📢  <i>Keep sharing your referral link to maximize your earnings!</i>\n",
      parse_mode: "HTML"
    });
    ```

**Key Points in the Markdown:**

* I've used clear headings and formatting.
* I've explained the purpose, usage, and provided a simplified example.
* I've included the code snippet for reference.
* I've highlighted the maintenance mode check.

This should give you a good, concise description for your command!

###   🎁 My Rewards

* **Purpose:** Displays the user's reward history.
* **Description:** This command shows a list of the user's earned rewards. It checks for maintenance mode, and if active, informs non-admins that the bot is unavailable. The command retrieves and formats the user's reward history, specifically filtering daily rewards to only show those claimed outside the last 24 hours. If there are no rewards, or no valid rewards, it informs the user accordingly.
* **Example:** (This command doesn't take parameters, so it's simply) `/my_rewards`
* **Code Snippet:**

    ```javascript
    const ADMIN_ID = 7316439041; //  🔁 Replace with your real Telegram ID

    const isAdmin = user.telegramid === ADMIN_ID;
    const isMaintenance = Bot.getProp("maintenance_mode") === true;

    if (isMaintenance && !isAdmin) {
      Bot.sendMessage(
        "🚧  <b>Maintenance Mode</b>\n\n" +
        "⛔  <i>The bot is currently under maintenance.</i>\n" +
        "🕒  <b>Please try again later...</b>",
        { parse_mode: "HTML" }
      );
      return; //  Stop this command
    }

    let rewards = User.getProp("reward_history") || [];
    const lastClaim = User.getProp("last_bonus_time");
    const now = Date.now();
    const SECONDS_24H = 24 \* 60 \* 60 \* 1000;

    if (rewards.length === 0) {
      Bot.sendMessage("<b>🎁  You don’t have any rewards yet.</b>\n\n<i>Start claiming bonuses to fill this list!</i>", {
        parse_mode: "HTML"
      });
      return;
    }

    let msg = "<b>🎁  My Rewards</b>\n\n";
    let validRewards = []; //  Array to hold valid rewards

    for (let i = 0; i < rewards.length; i++) {
      let reward = rewards[i];
      if (reward.type === "Daily Bonus") {
        //  Check if the bonus was claimed within the last 24 hours
        if (lastClaim && (now - lastClaim < SECONDS_24H)) {
          validRewards.push(reward);
        }
      } else {
        validRewards.push(reward); //  Include other reward types
      }
    }

    if (validRewards.length === 0) {
      Bot.sendMessage("<b>🎁  You don’t have any rewards yet.</b>\n\n<i>Start claiming bonuses to fill this list!</i>", {
        parse_mode: "HTML"
      });
      return;
    }

    for (let i = 0; i < validRewards.length; i++) {
      let reward = validRewards[i];
      msg += "<b>" + (i + 1) + ".</b>  <i>" + reward.type + "</i>\n" +
             "    💸  <b>Amount:</b>  <i>" + reward.amount + " ₿</i>\n" +
             "    🕐  <b>Date:</b>  <i>" + reward.time + "</i>\n\n";
    }

    Bot.sendMessage(msg, { parse_mode: "HTML" });
    ```

These commands are used by regular users to interact with the withdrawal system.

###   📊 Leaderboard

* **Purpose:** Displays options for viewing leaderboards.
* **Description:** This command presents users with a menu to explore different leaderboards within the bot. It includes a check for maintenance mode, and if active, informs non-admins that the bot is unavailable. Currently, it offers an option to view the referrals leaderboard.
* **Example:** (This command doesn't take parameters, so it's simply) `/leaderboard`
* **Code Snippet:**

    ```javascript
    //  /leaderboard command (or whatever command you use for "📊 Leaderboard")

    const ADMIN_ID = 7316439041; //  🔁 Replace with your real Telegram ID

    const isAdmin = user.telegramid === ADMIN_ID;
    const isMaintenance = Bot.getProp("maintenance_mode") === true;

    if (isMaintenance && !isAdmin) {
      Api.sendMessage({
        chat_id: chat.chatid,
        text:
          "🚧  <b>Maintenance Mode</b>\n\n" +
          "⛔  <i>The bot is currently under maintenance.</i>\n" +
          "🕒  <b>Please try again later...</b>",
        parse_mode: "HTML"
      });
      return; //  Stop this command
    }

    Api.sendMessage({
      chat_id: chat.chatid,
      text:
        "🏆  <i>Leaderboard</i>  🏆</b>\n\n" +
        "Explore the top performers!\nChoose how to view the leaderboard:",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            { text: "👥 Referrals", callback_data: "/leaderboard_referrals" }
          ]
        ]
      }
    });
    ```

###   `/withdraw`

* **Purpose:** Initiates a new withdrawal request.
* **Usage:** `/withdraw <Amount>`
* **Description:** This command allows users to request a withdrawal of a specified amount. The bot will validate the amount and, if valid, create a withdrawal request for admin review.
* **Example:** `/withdraw 0.001`
* **Important:**
    * The amount must be a valid number.
    * Users may need to set their wallet address first (see `/set_wallet`).
* **Code Snippet:**

    ```javascript
    if (!params) {
      return Api.sendMessage({
        chat_id: chat.chatid,
        text: "❌ Invalid Usage ❌\n\nPlease use the command like this:\n`/withdraw Amount`",
        parse_mode: "HTML",
      });
    }
    let amount = parseFloat(params);
    //  ... (Validation and withdrawal logic)
    ```

###   `/set_wallet`

* **Purpose:** Sets the user's cryptocurrency wallet address.
* **Usage:** `/set_wallet <YourWalletAddress>`
* **Description:** This command allows users to securely store their wallet address, which is necessary for processing withdrawals.
* **Example:** `/set_wallet 0xAbC123...`
* **Security:**
    * Emphasize to users that they should enter their wallet address carefully.
    * The bot should handle this data securely (see security best practices).
* **Code Snippet:**

    ```javascript
    if (!params) {
      return Api.sendMessage({
        chat_id: chat.chatid,
        text: "⚙️ Please provide your wallet address:\n`/set_wallet YourBTCAddress`",
        parse_mode: "HTML",
      });
    }
    let wallet = params;
    User.setProp("wallet", wallet);
    //  ... (Confirmation message)
    ```

##   Admin Commands

These commands are used by bot administrators to manage withdrawal requests.

###   `/accept`

* **Purpose:** Approves a pending withdrawal request.
* **Usage:** `/accept <WithdrawalID>`
* **Description:** This command allows administrators to approve a specific withdrawal request. The bot will then process the withdrawal (this part needs to be implemented according to your system) and notify the user.
* **Example:** `/accept abcdef123`
* **Important:**
    * Only authorized admins should be able to use this command (see security).
    * The bot needs to have the logic to actually send the cryptocurrency.
* **Code Snippet:**

    ```javascript
    if (user.telegramid !== ADMIN_ID) { //  Replace ADMIN_ID
      return Api.sendMessage({
        chat_id: chat.chatid,
        text: "⛔ Admin Only ⛔",
        parse_mode: "HTML",
      });
    }
    if (!params) {
      return Api.sendMessage({
        chat_id: chat.chatid,
        text: "❌ Invalid Usage! Use: `/accept WithdrawalID`",
        parse_mode: "HTML",
      });
    }
    let withdraw_id = params;
    //  ... (Logic to process withdrawal)
    ```

###   `/deny`

* **Purpose:** Denies a pending withdrawal request.
* **Usage:** `/deny <WithdrawalID>`
* **Description:** This command allows administrators to deny a specific withdrawal request. The bot will notify the user that their request was denied.
* **Example:** `/deny abcdef123`
* **Security:**
    * Only authorized admins should be able to use this command.
* **Code Snippet:**

    ```javascript
    if (user.telegramid !== ADMIN_ID) { //  Replace ADMIN_ID
      return Api.sendMessage({
        chat_id: chat.chatid,
        text: "⛔ Admin Only ⛔",
        parse_mode: "HTML",
      });
    }
    if (!params) {
      return Api.sendMessage({
        chat_id: chat.chatid,
        text: "❌ Invalid Usage! Use: `/deny WithdrawalID`",
        parse_mode: "HTML",
      });
    }
    let withdraw_id = params;
    //  ... (Logic to deny withdrawal)
    ```

**Additional Notes for the README:**

* **Error Handling:** You could add a section on how the bot handles errors (e.g., invalid input, insufficient funds).
* **Security:**
    * Mention that admin commands should be protected.
    * Advise users to keep their wallet addresses safe.
* **Customization:** If your bot has customizable settings (e.g., withdrawal limits), document those.
* **Support:** Include a way for users and admins to get support (e.g., a Telegram contact).

Remember to replace the placeholder code comments (`// ... (Logic to process withdrawal)`) with your actual implementation.
