const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const company_id = request.headers.authorization; 
        const products_orders =   await connection('products_orders')
        .join('orders', 'orders.order_id', 'products_orders.order_id')
        .where('orders.company_id', company_id)
        .select('*');
 
        return response.json(products_orders);
 },

    async create (request, response){
        const {orders_products, description} = request.body;
        const company_id = request.headers.authorization1;
        const user_id = request.headers.authorization2;
        let indice = 0;
        

        await  connection('orders').insert({
          company_id,
          user_id,
          description 
        })
        .catch(function(error) {
          return response.status(201).json('Error registering');
        })
        .then(function() {

            orders_products.forEach( async function(orders_products){    

              await  connection('products_orders').insert({
                product_id: orders_products[0],
                value: orders_products[1],
                amount: orders_products[2],
                order_id: orders_products[3]
              })
  
          
            })
        })
        .then(function() {
          return response.status(201).json('Saved successfully.');
        })
        .catch(function(error) {
          return response.status(201).json('Error registering');
        });
    }
    }