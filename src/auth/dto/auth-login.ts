import { IsEmail, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { UserDetailsObject } from "./auth-shared";

export class LoginRequest {
  @ApiProperty()
  @IsEmail()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class LoginResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty()
  user: UserDetailsObject;
}
