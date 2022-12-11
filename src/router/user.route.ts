import { Router } from "express";
import UserController from "../controllers/User.controller";
import { DTORegister } from "../dto/user/DtoRegister";
import validation from "../middlewares/Validation.middleware";
import UserService from "../services/User.service";

class UserRoute {
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
    this.userRouter.delete("/:username", this.controller.deleteAnUserWithUsername);
    return this.userRouter;
  }
}

export default new UserRoute().main();
