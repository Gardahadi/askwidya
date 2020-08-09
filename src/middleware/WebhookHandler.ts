import { BotController } from "../controllers/BotController";

const botController = new BotController();
export const webhookHandler = async (req, res) => {
  const body = req.body;
  if (body.object === "page") {
    body.entry.forEach(async (entry) => {
      // Gets the message. entry.messaging is an array, but
      // will only ever contain one message, so we get index 0
      const webhookEvent = entry.messaging[0];

      // Get the sender PSID
      const senderPsid = webhookEvent.sender.id;
      console.log("Sender PSID: " + senderPsid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhookEvent.message) {
        const receivedMessage = webhookEvent.message;
        console.log(receivedMessage);
        await botController.handleMessage(senderPsid, receivedMessage);
      } else if (webhookEvent.postback) {
        console.log(webhookEvent.postback);
      }
    });

    res.status(200).send("EVENT_RECEIVED");
  } else {
    res.sendStatus(404);
  }
};
