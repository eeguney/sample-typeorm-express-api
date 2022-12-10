import { ClassConstructor, plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";
import STATUS_CODE from "../constants/statuscodes";

function validation(Type: ClassConstructor<any>) {
  return async function (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    const object = plainToClass(Type, req.body);
    const errors = await validate(object);
    if (errors.length > 0) {
      return res
        .status(STATUS_CODE.ERROR.BAD_REQUEST)
        .json("Validation failed");
    }
    next();
  };
}

export default validation;
