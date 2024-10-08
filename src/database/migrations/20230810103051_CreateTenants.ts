import { Knex } from "knex"

const tableName = 'tenants'

export async function up(knex: Knex) {
    return knex.schema.withSchema('public').createTable(tableName, table => {
      table.increments()
      table.string('name').nullable();
      table.string('prefix').nullable();
      table.string('contact').nullable();
      table.text('address').nullable();
      table.timestamp('created_at').nullable()
      table.integer('created_by').nullable()
      table.timestamp('updated_at').nullable()
      table.integer('updated_by').nullable()
      table.timestamp('deleted_at').nullable()
      table.integer('deleted_by').nullable()
    })
}

export async function down(knex: Knex) {
  return knex.schema.withSchema('public').dropTable(tableName)
}