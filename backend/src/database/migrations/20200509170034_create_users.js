
exports.up = function(knex) {
    return knex.schema.createTable('users',function (table){
        table.increments('user_id').primary();
        table.string('user').notNullable();
        table.string('password').notNullable();
        table.string('company_id').notNullable();
        table.foreign('company_id').references('company_id').inTable('companies');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
