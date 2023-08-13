import { Knex } from "knex"
import { PackageModel } from "src/packages/package.model";

export async function seed(knex: Knex): Promise<any> {
    await PackageModel.query(knex).withSchema('public').insert([
        {
            id: 1,
            name: 'Free Trial',
            duration: 1,
            price: 0,
            created_at: new Date(),
        },
    ]);
}