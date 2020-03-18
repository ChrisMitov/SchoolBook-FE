import {School} from "./school";

export class User {
  id: number;
  username: string;
  password: string;
  name: string;
  authdata?: string;
  role: string;
  school: School;
  subject: string;
  classNumber: number;
  parent: User;
}
