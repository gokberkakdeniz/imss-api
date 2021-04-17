import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import ObsBridgeService, { SISBRole, SISBUserResult } from "../external-services/obs-bridge";

export interface JwtPayload {
  sub: number;
  role: SISBRole;
}

@Injectable()
export class AuthService {
  constructor(private obsBridgeService: ObsBridgeService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<SISBUserResult> {
    const result = await this.obsBridgeService.getUserByCrediantals(username, password);

    return result;
  }

  async getToken(user: SISBUserResult["data"]) {
    const payload: JwtPayload = { sub: user.id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
