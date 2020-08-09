// Example
import { createConnection, getConnection } from "typeorm";
import "dotenv/config";

beforeAll(async () => {
  await createConnection();
});

afterAll(async () => {
  await getConnection().close();
});
