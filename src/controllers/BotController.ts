import { UserController } from "./UserController";
import { WIDYA_REPLIES } from "../values/payload";

const userController = new UserController();

export class BotController {
  // Handles messages events
  async handleMessage(psid, receivedMessage) {
    if (receivedMessage.text) {
      // check wether or not user is in database
      if (userController.isUserExist(psid)) {
        if (userController.isFirstnameExist(psid)) {
          if (userController.isBirthdayExist(psid)) {
            this.sendMessage(psid, this.getBirthdayMessage());
          } else {
            await this.saveBirthday(psid, receivedMessage);
            await this.askService(psid);
          }
        } else {
          await this.saveFirstName(psid, receivedMessage);
          await this.askBirthday(psid);
        }
      } else {
        await this.saveUser(psid);
        await this.askFirstName(psid);
      }
    }
  }

  async getBirthdayMessage() {
    return "still cant count yet";
  }

  async saveUser(newPsid) {
    await userController.saveNewUser({
      psid: newPsid,
    });
  }

  async askFirstName(psid) {
    const response = WIDYA_REPLIES[0].payload;
    this.sendMessage(psid, response);
  }

  async saveFirstName(psid, name) {
    await userController.saveFirstName(psid, name);
  }

  async askBirthday(psid) {
    const response = WIDYA_REPLIES[1].payload;
    this.sendMessage(psid, response);
  }

  async saveBirthday(psid, birthday) {
    await userController.saveBirthday(psid, birthday);
  }

  async askService(psid) {
    const response = WIDYA_REPLIES[2].payload;
    this.sendMessage(psid, response);
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
    const uri = `https://graph.facebook.com/v8.0/me/messages?access_token=${ACCESS_TOKEN}`;
    const res = await fetch(uri, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });
    console.log(res);
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
