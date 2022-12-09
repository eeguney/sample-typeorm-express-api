import { Router } from "express";
import UserRouter from "./user.route";

class MainRouter {
  private router;
  constructor() {
    this.router = Router() as Router;
  }
  main(): Router {
    this.router.use("/users", UserRouter);
    return this.router;
  }
}

export default new MainRouter().main();
