import { getManager } from 'typeorm';
import { Message } from '../entities/Message';

export class MessageController {
  // Method to get All Messages
  async getAll() {
    const messageRepository = getManager().getRepository(Message);

    const messages = await messageRepository.find();

    return messages;
  }

  // Method to get message by id
  async getById(id) {
    const messageRepository = getManager().getRepository(Message);
    const message = await messageRepository.findOne(id);
    console.log(message);
    return message;
  }

  // Method to post new message
  async postMessage(body) {
    const messageRepository = getManager().getRepository(Message);

    const newMessage = messageRepository.create(body);
    await messageRepository.save(newMessage);

    return newMessage;
  }

  // Method to delete message
  async deleteMessage(id) {
    const messageRepository = getManager().getRepository(Message);

    const deleteMessage = messageRepository.delete(id);

    return deleteMessage;
  }
}
