import { webhookHandler } from './middleware/WebhookHandler';
import { verificationHandler } from './middleware/VerificationHandler';
import {
  getAllMessageHandler,
  getMessageByIdHandler,
  postMessageHandler,
  deleteMessageHandler,
} from './middleware/MessageHandler';
import { getUserByIdHandler, postUserHandler } from './middleware/UserHandler';
export const Routes = [
  {
    path: '/messages',
    method: 'get',
    action: getAllMessageHandler,
  },
  {
    path: '/messages/:id',
    method: 'get',
    action: getMessageByIdHandler,
  },
  {
    path: '/messages',
    method: 'post',
    action: postMessageHandler,
  },
  {
    path: '/messages/:id',
    method: 'delete',
    action: deleteMessageHandler,
  },
  {
    path: '/webhook',
    method: 'get',
    action: verificationHandler,
  },
  {
    path: '/webhook',
    method: 'post',
    action: webhookHandler,
  },
  {
    path: '/users',
    method: 'post',
    action: postUserHandler,
  },
  {
    path: '/users/:id',
    method: 'get',
    action: getUserByIdHandler,
  },
];
