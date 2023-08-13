import { Knex } from "knex"

const tableName = 'subscriptions'

export async function up(knex: Knex) {
    return knex.schema.withSchema('public').createTable(tableName, table => {
      table.increments()
      table.integer('tenant_id').unsigned().references('id').inTable('tenants')
      table.integer('package_id').unsigned().references('id').inTable('packages')
      table.timestamp('expire_at').nullable()
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