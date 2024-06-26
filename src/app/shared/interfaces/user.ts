import { Choices } from "./subject";

export interface User {
  id: string,
  name: string,
  email: string,
  password: string,
  rePassword: string,
  subjects?: StudentSubject[];
}

export interface StudentSubject  {
  name: string;
  id: string;
  degree: string;
  studentAnswers: Choices[];
}


