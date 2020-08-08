import * as express from 'express';
import 'dotenv/config';
import { createConnection } from 'typeorm';

// Create TypeORM Connection
createConnection().then((_) => {
  // create and setup express app
  const app = express();

  // Set up dummy api route
  app.get('/api', (_, res) => {
    res.status(200).json({
      hello: 'World!',
    });
  });

  const port: number = Number(process.env.PORT) || 3000;

  const startServer = async () => {
    await app.listen(port);
  };

  startServer();
});
