import 'dotenv/config';
import { Global, Module } from "@nestjs/common";
import { UserModel } from "../users/user.model";
import { PackageModel } from '../packages/package.model';
import { Model, knexSnakeCaseMappers } from "objection";
import Knex from 'knex';
import { TenantModel } from 'src/tenants/tenant.model';
import { SubscriptionModel } from 'src/subscriptions/subscription.model';
const models = [UserModel, TenantModel, PackageModel, SubscriptionModel];

const modelProviders = models.map(model => {
    return {
        provide: model.name,
        useValue: model
    };
});

const providers = [
    ...modelProviders,
    {
        provide: 'KnexConnection',
        useFactory: async () => {
            const knex = Knex({
                client: 'pg',
                connection: process.env.DB_URL,
                // ...knexSnakeCaseMappers()
            });
    
            Model.knex(knex);
            return knex;
        }
    }
];

@Global()
@Module({
  providers: [...providers],
  exports: [...providers]
})
export class DatabaseModule {}