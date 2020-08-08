import * as express from 'express';
import 'dotenv/config';

const app = express();

// Set up dummy api route
app.get('/api', (req, res, next) => {
  res.status(200).json({
    hello: 'World!',
  });
});

const port: Number = number(process.env.PORT) || 3000;
const startServer = async () => {
  await app.listen(port, () => {
//     console.log(`
// Server running on http://localhost:${port}
// `);
  });
};

startServer();