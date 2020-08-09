import { Request, Response } from 'express';

export const  verificationHandler = async (req : Request, res : Response) => {
  const VERIFY_TOKEN = process.env.BOT_VERIFY_TOKEN;
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
};
