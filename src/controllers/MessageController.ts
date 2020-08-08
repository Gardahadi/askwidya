import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { Message } from '../entities/Message';

export class MessageController {
  // Method to get All Messages
  async getAll(_request: Request, response: Response) {
    const messageRepository = getManager().getRepository(Message);

    const messages = await messageRepository.find();

    response.send(messages);
  }

  // Method to get message by id
  async getById(request: Request, response: Response) {
    const messageRepository = getManager().getRepository(Message);

    const message = await messageRepository.findOne(request.params.id);

    // if message was not found return 404 to the client
    if (!message) {
      response.status(404);
      response.end();
      return;
    }

    response.send(message);
  }

  async postMessage(request: Request, response: Response) {
    const messageRepository = getManager().getRepository(Message);
    const newMessage = messageRepository.create(request.body);

    await messageRepository.save(newMessage);

    response.send(newMessage);
  }

  async deleteMessage(request: Request, response: Response) {
    const messageRepository = getManager().getRepository(Message);
    const deleteMessage = await messageRepository.delete(request.params.id);
    if (deleteMessage.affected) {
      response.send(deleteMessage);
    } else {
      response.status(404);
      response.end();
      return;
    }
  }
}
