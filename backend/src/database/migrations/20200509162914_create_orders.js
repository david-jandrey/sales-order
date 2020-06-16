
exports.up = function(knex) {
    return knex.schema.createTable('orders',function (table){
        table.increments('order_id').primary();
        table.string('description').notNullable();
        table.string('company_id').notNullable();
        table.string('user_id').notNullable();
        table.foreign('company_id').references('company_id').inTable('companies');
        table.foreign('user_id').references('user_id').inTable('users');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
