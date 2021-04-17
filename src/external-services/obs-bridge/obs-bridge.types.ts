export type SISBRole = "STUDENT" | "ACADEMICIAN" | "INSTITUTE_MEMBER";
export interface SISBUser {
  id: number;
  username: string;
  password: string;
  role: SISBRole;
  name: string;
  surname: string;
}

export interface SISBResult<T> {
  success: boolean;
  error?: string;
  data?: T;
}

export type SISBUserResult = SISBResult<Omit<SISBUser, "password">>;

export interface StudentInformationSystemBridge {
  getUserByCrediantals: (
    username: string,
    password: string
  ) => Promise<SISBUserResult>;

  getUserById: (userId: number) => Promise<SISBUserResult>;
}
