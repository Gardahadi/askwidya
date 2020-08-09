// import { UserController } from './UserController';

// const messageController = new MessageController();

export class BotController {
  // Handles messages events
  handleMessage(senderPsid, receivedMessage) {
    const response = "Hi! My name is Widya, I dont think we've met before, whats your name?";

    if (receivedMessage.text) {
      // check wether or not user is in database

      this.sendMessage(senderPsid, response);
    }
  }

  // Sends response messages via the Send API
  async sendMessage(senderPsid, response) {
    const fetch = require("node-fetch");
    // Construct the message body
    const request_body = {
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
      body: JSON.stringify(request_body),
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
