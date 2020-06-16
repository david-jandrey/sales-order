
exports.up = function(knex) {
    return knex.schema.createTable('products_orders',function (table){
        table.increments('product_order_id').primary();
        table.decimal('value').notNullable();
        table.integer('amount').notNullable();
        table.string('order_id').notNullable();
        table.string('product_id').notNullable();
        table.foreign('order_id').references('order_id').inTable('orders');
        table.foreign('product_id').references('product_id').inTable('products');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('products_orders');
};