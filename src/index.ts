import * as express from 'express';
import 'dotenv/config';
import { createConnection } from 'typeorm';
import { Routes } from './routes';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';

// Create TypeORM Connection
createConnection()
  .then(async () => {
    // Set up express app
    const app = express();
    app.use(bodyParser.json());

    // register all application routes
    Routes.forEach((route) => {
      app[route.method](route.path, (request: Request, response: Response, next: any) => {
        route
          .action(request, response)
          .then(() => next)
          .catch((err) => next(err));
      });
    });

    const port: number = Number(process.env.PORT) || 3000;

    const startServer = async () => {
      await app.listen(port);
    };

    startServer();
  })
  .catch((error) => console.error('TypeORM connection error: ', error));
