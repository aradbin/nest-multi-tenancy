import { BaseModel } from "src/database/base.model";

export class UserModel extends BaseModel {
  static tableName = 'users';

  id: number;
  name: string;
  email: string;
  username: string;
  password: string;
  contact: string;
}