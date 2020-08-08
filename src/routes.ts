import { MessageController } from './controllers/MessageController';

const messageController: MessageController = new MessageController();

export const Routes = [
  {
    path: '/messages',
    method: 'get',
    action: messageController.getAll,
  },
  {
    path: '/messages/:id',
    method: 'get',
    action: messageController.getById,
  },
  {
    path: '/messages',
    method: 'post',
    action: messageController.postMessage,
  },
  {
    path: '/messages/:id',
    method: 'delete',
    action: messageController.deleteMessage,
  },
];
