import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { JwtPayload } from "../auth.service";
import { SISBRole } from "external-services/obs-bridge";

export interface ControllerUserObject {
  id: number;
  role: SISBRole;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.IMSS_JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<ControllerUserObject> {
    return { id: payload.sub, role: payload.role };
  }
}
