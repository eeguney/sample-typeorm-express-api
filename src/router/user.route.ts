import { Router } from "express";
import UserController from "../controllers/user.controller";
import { DTORegister } from "../dto/user/DtoRegister";
import validation from "../middlewares/validation.middleware";
import UserService from "../services/user.service";

export class UserRoute {
  private userRouter: Router;
  service: UserService;
  controller: UserController;
  constructor() {
    this.userRouter = Router() as Router;
    this.service = new UserService();
    this.controller = new UserController(this.service);
  }

  main(): Router {
    this.userRouter.get("/", this.controller.getAllUsers);
    this.userRouter.post(
      "/",
      [validation(DTORegister)],
      this.controller.addNewUser
    );
    return this.userRouter;
  }
}

export default new UserRoute().main();
