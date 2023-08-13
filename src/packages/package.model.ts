import { BaseModel } from "src/database/base.model";

export class PackageModel extends BaseModel {
  static tableName = 'packages';

  id: number;
  name: string;
  duration: number;
  price: number;
}