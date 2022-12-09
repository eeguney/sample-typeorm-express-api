import express, { Application } from "express";
import CONFIG from "../config";
import cors from "cors";
import helmet from "helmet";
import Router from "../router/Router";
import logger from "./logger";

class CreateExpressServer {
  private app: Application;

  constructor() {
    this.app = express();
  }
  start(): void {
    // middlewares
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // routes
    this.app.use(CONFIG.api.prefix, Router);
    // run server
    this.app.listen(CONFIG.API_PORT, () => {
      logger.info(`Express server is running on port: ${CONFIG.API_PORT}`);
    });
  }
}

export default new CreateExpressServer();
