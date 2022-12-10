import { IsEmail, IsNotEmpty, MinLength, validateOrReject } from "class-validator";
import { BeforeInsert, BeforeUpdate } from "typeorm";

export class DTORegister {

    @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(11)
  password: string;

}
