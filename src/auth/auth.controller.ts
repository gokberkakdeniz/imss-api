import { Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags, ApiResponse, ApiBody, ApiOAuth2 } from "@nestjs/swagger";
import { ObsBridgeService, SISBUser, SISBUserResult } from "../external-services/obs-bridge";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Public } from "./decorators";
import { Request } from "express";

import { GetProfileResponse, LoginRequest, LoginResponse } from "./dto";

@ApiTags("auth")
@ApiOAuth2([])
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private obsBridgeService: ObsBridgeService) {}

  @Post("login")
  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: "Get token" })
  @ApiBody({ type: LoginRequest })
  @ApiResponse({
    status: 200,
    description: "Token and basic user information",
    type: LoginResponse,
  })
  async login(@Req() req: Request): Promise<LoginResponse> {
    return await this.authService.getToken(req.user as SISBUserResult["data"]);
  }

  @Get("profile")
  @ApiOperation({
    summary: "Get user's basic informations like name, surname, etc.",
  })
  @ApiResponse({
    status: 200,
    description: "User information",
    type: GetProfileResponse,
  })
  async getProfile(@Req() req: Request): Promise<Omit<SISBUser, "password">> {
    const { data } = await this.obsBridgeService.getUserById(req.user.id);
    return data;
  }
}
