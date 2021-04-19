import { ControllerUserObject } from "auth/strategies/jwt.strategy";

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface User extends ControllerUserObject {}
  }
}
