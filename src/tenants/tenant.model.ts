import { BaseModel } from "src/database/base.model";

export class TenantModel extends BaseModel {
  static tableName = 'tenants';

  id: number;
  name: string;
  prefix: string;
  contact: string;
  address: string;
}