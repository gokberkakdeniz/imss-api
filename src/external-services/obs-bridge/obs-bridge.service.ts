import { Injectable } from "@nestjs/common";
import { StudentInformationSystemBridge, SISBUserResult, SISBUser } from "../../external-services/obs-bridge";

import { users, grades, courses } from "../../data";
import {
  SISBDepartment,
  SISBGrade,
  SISBUsersResult,
  SISBGradesResult,
  SISBCourse,
  SISBCourseResult,
  SISBRequirementResult,
  SISBCreditResult,
} from "./obs-bridge.types";

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

  private getGrades(predicate: (g: SISBGrade) => boolean): Promise<SISBGradesResult> {
    const found = grades.filter(predicate);

    if (found) {
      return Promise.resolve({
        success: true,
        data: found,
      });
    }

    return Promise.resolve({
      success: false,
      error: "Grades not found.",
    });
  }

  private getCourse(predicate: (g: SISBCourse) => boolean): Promise<SISBCourseResult> {
    const found = courses.find(predicate);

    if (found) {
      return Promise.resolve({
        success: true,
        data: found,
      });
    }

    return Promise.resolve({
      success: false,
      error: "Course not found.",
    });
  }

  private async getTakenCredits(grades: SISBGrade[]): Promise<SISBCreditResult> {
    let allCredits = 0;
    for (let i = 0; i < grades.length; i += 1) {
      const course = await this.getCourse((course) => course.id === grades[i].courseId);
      if (course.success) {
        if (grades[i].grade >= 2) allCredits += course.data.credit;
      }
      return Promise.resolve({
        success: false,
        error: "Problem occured while getting course credit",
      });
    }

    return Promise.resolve({
      success: true,
      data: allCredits,
    });
  }

  private checkConsecutiveGrades(grades: SISBGrade[]): boolean {
    const thesisCourseGrades = grades.filter((grade) => grade.grade === 9 || grade.grade === -1);
    if (thesisCourseGrades.length < 4) return false; //not taken enough thesis course
    let nonConsec = 0;
    let consec = false;
    let before = thesisCourseGrades[0];
    for (let i = 1; i < thesisCourseGrades.length; i += 1) {
      if (thesisCourseGrades[i].grade === -1 && before.grade === -1) {
        //2 consecutive
        consec = true;
        break;
      } else if (thesisCourseGrades[i].grade === -1) {
        // 3 nonconsecutive
        nonConsec += 1;
      }
      before = thesisCourseGrades[i];
    }
    return consec || nonConsec >= 3;
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

  async isStudentEligibleFor(id: number): Promise<SISBRequirementResult> {
    const student = await this.getUser((user) => user.id === id);
    if (!student.success) {
      return Promise.resolve({
        success: false,
        data: false,
        error: student.error,
      });
    }

    if (student.data.semester < 4) {
      return Promise.resolve({
        success: false,
        data: false,
        error: "Student is not end of the 4th semester",
      });
    }

    if (student.data.gpa < 3) {
      return Promise.resolve({
        success: false,
        data: false,
        error: "Student's gpa is lower than 3",
      });
    }

    const grades = await this.getGrades((grade) => grade.userId === id);
    if (!grades.success) {
      return Promise.resolve({
        success: false,
        data: false,
        error: grades.error,
      });
    }

    const credits = await this.getTakenCredits(grades.data);
    if (!credits.success) {
      return Promise.resolve({
        success: false,
        data: false,
        error: grades.error,
      });
    }

    if (credits.data < 21) {
      return Promise.resolve({
        success: false,
        data: false,
        error: "Student does not have enough credit",
      });
    }

    const consecutive = this.checkConsecutiveGrades(grades.data);

    if (consecutive) {
      return Promise.resolve({
        success: false,
        data: false,
        error: "Student has restricted grades in Thesis Course",
      });
    }

    return Promise.resolve({
      success: true,
      data: true,
    });
  }
}
