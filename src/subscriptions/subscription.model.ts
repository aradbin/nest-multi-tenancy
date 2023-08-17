import { BaseModel } from "src/database/base.model";

export class SubscriptionModel extends BaseModel {
  static tableName = 'subscriptions';

  id: number;
  tenant_id: number;
  package_id: number;
  expire_at: string;
}