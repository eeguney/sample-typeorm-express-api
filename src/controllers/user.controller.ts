import { Request, RequestHandler, Response } from "express";
import STATUS_CODE from "../constants/statuscodes";
import { User } from "../entity/user.entity";
import UserService from "../services/user.service";
import logger from "../utils/logger";

export default class UserController {
  private userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  getAllUsers: RequestHandler = async (req: Request, res: Response) => {
    const query = req.query;
    try {
      const data = await this.userService.getAllUsers(query);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  addNewUser: RequestHandler = async (req: Request, res: Response) => {
    const theUser: User = req.body;
    try {
      const data = await this.userService.addNewUser(theUser);
      logger.info(`User created with name: ${theUser.firstName} ${theUser.lastName}`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };
}
