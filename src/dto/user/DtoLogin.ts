import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class DTOLogin {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @MinLength(11)
  password: string;
}
