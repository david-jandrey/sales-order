const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const company_id = request.headers.authorization; 
        const orders =   await connection('orders')
        .where('company_id', company_id)
        .max('order_id')
        .first();
 
        return response.json(Object.values(orders));
 }
    };