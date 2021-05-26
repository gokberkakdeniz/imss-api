import { Injectable } from "@nestjs/common";
import { StudentInformationSystemBridge, SISBUserResult, SISBUser } from "../../external-services/obs-bridge";

import users from "../../data/users";
import { SISBDepartment, SISBUsersResult } from "./obs-bridge.types";

@Injectable()
export class ObsBridgeService implements StudentInformationSystemBridge {
  getUserById(userId: number): Promise<SISBUserResult> {
    return this.getUser((user) => user.id === userId);
  }

  getUserByCrediantals(username: string, password: string): Promise<SISBUserResult> {
    return this.getUser((user) => user.username === username && user.password === password);
  }

  private getUser(predicate: (u: SISBUser) => boolean): Promise<SISBUserResult> {
    const found = users.find(predicate);

    if (found) {
      const { password: ignore, ...rest } = found;

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

  private getUsers(predicate: (u: SISBUser) => boolean): Promise<SISBUsersResult> {
    const filtered = users.filter(predicate).map(({ password, ...rest }) => rest);

    if (filtered.length > 0) {
      return Promise.resolve({
        success: true,
        data: filtered,
      });
    }

    return Promise.resolve({
      success: false,
      error: "User not found.",
    });
  }

  getAcademicansOfDepartment(department: SISBDepartment): Promise<SISBUsersResult> {
    return this.getUsers((user) => user.role === "ACADEMICIAN" && user.department === department);
  }
}
