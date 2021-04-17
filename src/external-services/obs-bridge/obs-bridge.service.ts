import { Injectable } from "@nestjs/common";
import {
  StudentInformationSystemBridge,
  SISBUserResult,
  SISBUser,
} from "../../external-services/obs-bridge";

import users from "../../data/users";

@Injectable()
export default class ObsBridgeService
  implements StudentInformationSystemBridge {
  getUserById(userId: number): Promise<SISBUserResult> {
    return this.getUser((user) => user.id === userId);
  }

  getUserByCrediantals(
    username: string,
    password: string
  ): Promise<SISBUserResult> {
    return this.getUser(
      (user) => user.username === username && user.password === password
    );
  }

  private getUser(
    predicate: (u: SISBUser) => boolean
  ): Promise<SISBUserResult> {
    const found = users.find(predicate);

    if (found) {
      const { password: _ignore, ...rest } = found;

      return Promise.resolve({
        success: true,
        data: rest,
      });
    }

    return Promise.resolve({
      success: false,
      error: "User not found.",
    });
  }
}
