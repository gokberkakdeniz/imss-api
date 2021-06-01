export type SISBRole = "STUDENT" | "ACADEMICIAN" | "INSTITUTE_MEMBER";
export interface SISBUser {
  id: number;
  username: string;
  password: string;
  role: SISBRole;
  name: string;
  surname: string;
  department?: SISBDepartment;
  email: string;
  gpa?: number;
  semester?: number;
}

export interface SISBCourse {
  id: number;
  name: string;
  credit: number;
  department?: SISBDepartment;
}

/*
9 - S // 8 - AA // 7 - BA // 6 - BB // 5 - CB 
4 - CC // 3 - DC // 2 - DD // 1 - FC // 0 - FF // -1 - U
*/
export interface SISBGrade {
  id: number;
  courseId: number;
  userId: number;
  grade: number;
  semester: number;
}

export interface SISBResult<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export type SISBDepartment = "CENG";

export type SISBUserDto = Omit<SISBUser, "password">;
export type SISBGradeResult = SISBResult<SISBGrade>;
export type SISBGradesResult = SISBResult<SISBGrade[]>;
export type SISBUserResult = SISBResult<SISBUserDto>;
export type SISBCourseResult = SISBResult<SISBCourse>;
export type SISBCoursesResult = SISBResult<SISBCourse[]>;
export type SISBUsersResult = SISBResult<SISBUserDto[]>;
export type SISBCreditResult = SISBResult<number>;
export type SISBRequirementResult = SISBResult<boolean>;
export type SISBGPAResult = SISBResult<number>;
export interface StudentInformationSystemBridge {
  getUserByCrediantals: (username: string, password: string) => Promise<SISBUserResult>;

  getUserById: (userId: number) => Promise<SISBUserResult>;
}
