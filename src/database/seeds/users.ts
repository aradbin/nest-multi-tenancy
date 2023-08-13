import { Knex } from "knex"
import * as bcrypt from 'bcrypt';
import { UserModel } from "src/users/user.model";

export async function seed(knex: Knex): Promise<any> {
    await UserModel.query(knex).withSchema('public').insert([
        {
            id: 1,
            name: 'Arad Bin',
            email: 'aradbin@gmail.com',
            username: 'aradbin',
            password: bcrypt.hashSync('aradbin', 10),
            contact: '01748419892',
            verified: 1,
            created_at: new Date(),
        },
    ]);
}