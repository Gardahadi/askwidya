import * as express from "express";
import "dotenv/config";
import { Routes } from "./routes";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
export class App {
  public express;

  public constructor() {
    this.express = express();

    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));

    // register all application routes
    Routes.forEach((route) => {
      this.express[route.method](route.path, async (request: Request, response: Response, next: any) => {
        await route.action(request, response);
        next();
      });
    });
  }
}
