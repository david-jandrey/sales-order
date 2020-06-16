const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const company_id = request.headers.authorization; 
        const products =   await connection('products')
        .where('company_id', company_id)
        .select('*');
 
        return response.json(products);
 },

    async create (request, response){

        const {description} = request.body;
        const company_id = request.headers.authorization;
           
      
      await  connection('products').insert({

        description,
        company_id
      })
      return response.status(201).json('Saved successfully.');
    }
    /*async delete (request, response) {
        const {product_id} = request.params;
        const company_id = request.headers.authorization;

        const products = await connection('products')
        .where('product_id', product_id)
        .select('company_id')
        .first();

        if(products.company_id != company_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('products').where('product_id',product_id).delete();

        return response.status(201).send();
    }*/
};