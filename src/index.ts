import "dotenv/config";
import { createConnection } from "typeorm";
import { App } from "./App";

// Create TypeORM Connection
createConnection()
  .then(async () => {
    // Set up express app
    const app = new App();

    const port: number = Number(process.env.PORT) || 3000;
    app.express.listen(port);
  })
  .catch((error) => console.error("TypeORM connection error: ", error));
