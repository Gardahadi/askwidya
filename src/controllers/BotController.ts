import { UserController } from "./UserController";
import { WIDYA_REPLIES, QUICK_REPLIES } from "../values/payload";

const userController = new UserController();

export class BotController {
  // Handles messages events
  async handleMessage(psid, receivedMessage) {
    if (receivedMessage.text) {
      // check wether or not user is in database
      if (await userController.isUserExist(psid)) {
        if (await userController.isFirstnameExist(psid)) {
          if (await userController.isBirthdayExist(psid)) {
            await this.getBirthdayMessage(psid, receivedMessage.text);
          } else {
            await this.saveBirthday(psid, receivedMessage.text);
          }
        } else {
          await this.saveFirstName(psid, receivedMessage.text);
        }
      } else {
        await this.saveUser(psid);
      }
    }
  }

  async getBirthdayMessage(psid, text) {
    const positive = ["yes", "yeah", "yup", "yeah", "Yeah", "Yes"];
    const negative = ["no", "nah", "nope", "nay", "No", "Nah"];
    if (positive.includes(text)) {
      const birthday: Date = await userController.getBirthday(psid);
      const today = new Date(Date.now());
      birthday.setFullYear(today.getFullYear());
      if (birthday.getTime() < today.getTime()) {
        birthday.setFullYear(today.getFullYear() + 1);
      }
      const interval = birthday.getTime() - Date.now();
      const days = Math.round(interval / (1000 * 60 * 60 * 24));
      this.sendMessage(psid, `There are ${days.toString()} days left till your Birthday`);
    } else if (negative.includes(text)) {
      this.sendMessage(psid, "Goodbye");
    } else {
      this.askService(psid);
    }
  }

  async saveUser(newPsid) {
    const saveSuccess = await userController.saveNewUser({
      psid: newPsid,
    });
    if (saveSuccess) {
      await this.askFirstName(newPsid);
    } else {
      this.sendMessage(newPsid, "Sorry wrong format");
    }
  }

  async askFirstName(psid) {
    const response = WIDYA_REPLIES[0].payload;
    this.sendMessage(psid, response);
  }

  async saveFirstName(psid, name) {
    console.log("firstname " + name);

    const saveSuccess = await userController.saveFirstName(psid, name);
    if (saveSuccess) {
      await this.askBirthday(psid);
    }
  }

  async askBirthday(psid) {
    const response = WIDYA_REPLIES[1].payload;
    this.sendMessage(psid, response);
  }

  async saveBirthday(psid, birthday) {
    if (this.isValidDate(birthday)) {
      await userController.saveBirthday(psid, birthday);
      await this.askService(psid);
    } else this.sendMessage(psid, "I couldnt parse the date");
  }

  async askService(psid) {
    const response = WIDYA_REPLIES[2].payload;
    this.sendBirthdayMessage(psid, response);
  }

  async sendBirthdayMessage(senderPsid, response) {
    const fetch = require("node-fetch");
    // Construct the message body
    const requestBody = {
      recipient: {
        id: senderPsid,
      },
      messaging_type: "RESPONSE",
      message: {
        text: response,
        quick_replies: QUICK_REPLIES,
      },
    };

    // Send the HTTP request to the Messenger Platform
    const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    // console.log(requestBody);
    const uri = `https://graph.facebook.com/v8.0/me/messages?access_token=${ACCESS_TOKEN}`;
    const res = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    console.log(res);
  }

  // Sends response messages via the Send API
  async sendMessage(senderPsid, response) {
    const fetch = require("node-fetch");
    // Construct the message body
    const requestBody = {
      messaging_type: "RESPONSE",

      recipient: {
        id: senderPsid,
      },
      message: {
        text: response,
      },
    };

    // Send the HTTP request to the Messenger Platform
    const ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
    // console.log(requestBody);
    const uri = `https://graph.facebook.com/v8.0/me/messages?access_token=${ACCESS_TOKEN}`;
    const res = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    console.log(res);
  }

  // Validates that the input string is a valid date formatted as "mm/dd/yyyy"
  isValidDate(dateString) {
    // First check for the pattern
    console.log(dateString);
    if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(dateString)) {
      console.log("WRONG");
      return false;
    } else {
      console.log("RIGHT");
      // Parse the date parts to integers
      var parts = dateString.split("-");
      var day = parseInt(parts[2], 10);
      var month = parseInt(parts[1], 10);
      var year = parseInt(parts[0], 10);

      // Check the ranges of month and year
      if (year < 1000 || year > 3000 || month == 0 || month > 12) return false;

      var monthLength = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

      // Adjust for leap years
      if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
    }
  }
  //   //
  //   handlePostback(senderPsid, received_postback) {
  //     let response;

  //     // Get the payload for the postback
  //     let payload = received_postback.payload;

  //     if (payload === 'GET_STARTED') {
  //     }
  //   }
}
