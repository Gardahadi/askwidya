import { MessageController } from '../controllers/MessageController';

import { Request, Response } from 'express';

const messageController = new MessageController();

// Method to get All Messages
export const getAllMessageHandler = async (_request: Request, response: Response) => {
  const messages = await messageController.getAll();

  response.send(messages);
};

// Method to get message by id
export const getMessageByIdHandler = async (request: Request, response: Response) => {
  const message = await messageController.getById(request.params.id);

  // if message was not found return 404 to the client
  if (!message) {
    response.status(404);
    response.end();
    return;
  } else {
    response.send(message);
  }
};

export const postMessageHandler = async (request: Request, response: Response) => {
  const newMessage = await messageController.postMessage(request.body);

  response.send(newMessage);
};

export const deleteMessageHandler = async (request: Request, response: Response) => {
  const deleteMessage = await messageController.deleteMessage(request.params.id);
  if (deleteMessage.affected) {
    response.send(deleteMessage);
  } else {
    response.status(404);
    response.end();
    return;
  }
};
