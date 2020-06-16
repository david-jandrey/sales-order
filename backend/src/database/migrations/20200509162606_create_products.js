
exports.up = function(knex) {
    return knex.schema.createTable('products',function (table){
        table.increments('product_id').primary();
        table.string('description').notNullable();
        table.string('company_id').notNullable();
        table.foreign('company_id').references('company_id').inTable('companies');
        
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products');
};