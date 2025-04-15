#   Cryptocurrency Withdrawal Management Bot

This bot provides a comprehensive system for managing cryptocurrency withdrawal requests within Telegram. It offers a user-friendly interface for submitting requests and an efficient system for administrators to process them.

##   Table of Contents

1.  [   User Commands](#user-commands)
2.  [   Admin Commands](#admin-commands)

##   User Commands

These commands are used by regular users to interact with the withdrawal system.

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
