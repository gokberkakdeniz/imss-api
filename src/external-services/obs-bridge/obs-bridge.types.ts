export type SISBRole = "STUDENT" | "ACADEMICIAN" | "INSTITUTE_MEMBER";
export interface SISBUser {
  id: number;
  username: string;
  password: string;
  role: SISBRole;
  name: string;
  surname: string;
  department?: SISBDepartment;
}

export interface SISBResult<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export type SISBDepartment = "CENG";

export type SISBUserDto = Omit<SISBUser, "password">;

export type SISBUserResult = SISBResult<SISBUserDto>;
export type SISBUsersResult = SISBResult<SISBUserDto[]>;

export interface StudentInformationSystemBridge {
  getUserByCrediantals: (username: string, password: string) => Promise<SISBUserResult>;

  getUserById: (userId: number) => Promise<SISBUserResult>;
}
