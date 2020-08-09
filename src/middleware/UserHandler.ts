import { UserController } from '../controllers/UserController';
import { Request, Response } from 'express';
const userController = new UserController();

// Method to get message by id
export const getUserByIdHandler = async (request: Request, response: Response) => {
  const user = await userController.getById(request.params.id);

  // if message was not found return 404 to the client
  if (!user) {
    response.status(404);
    response.send('User not found');
    return;
  } else {
    response.send(user);
  }
};

export const postUserHandler = async (request: Request, response: Response) => {
  const newMessage = await userController.saveNewUser(request.body);

  response.send(newMessage);
};
