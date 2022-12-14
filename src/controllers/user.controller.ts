import { Request, RequestHandler, Response } from "express";
import STATUS_CODE from "../constants/statuscodes";
import { DTORegister } from "../dto/user/DtoRegister";
import UserService from "../services/User.service";
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
    const theUser: DTORegister = req.body;
    try {
      const data = await this.userService.addNewUser(theUser);
      logger.info(`User created with name: ${theUser.firstName} ${theUser.lastName}`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  };

  deleteAnUserWithUsername: RequestHandler = async (req: Request, res: Response) => {
    const { username } = req.params;
    try {
      const data = await this.userService.deleteAnUserWithUsername(username);
      logger.info(`User deleted`);
      return res.status(STATUS_CODE.SUCCESS.OK).json(data);
    } catch (error) {
      logger.error(error);
      return res.status(STATUS_CODE.ERROR.BAD_REQUEST).send(error);
    }
  }
}
