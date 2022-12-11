import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from "class-validator";

export class DTORegister {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(24)
  password: string;
}
