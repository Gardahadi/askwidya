import { App } from "./App";
import * as request from "supertest";

const app = new App().express;

describe("App test", () => {
  it("/messages/", async (done) => {
    request(app).get("/messages").expect(200, done);
  });
});
