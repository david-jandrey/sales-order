const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const companies =   await connection('companies').select('*');
 
        return response.json(companies);
 },

    async create (request, response){

        const {name} = request.body;

      const  company_id = crypto.randomBytes(4).toString('HEX');
           
      
      await  connection('companies').insert({

            company_id,
            name,
      })
       return response.json({ company_id })
    },
    async delete (request, response) {
      const {company_id} = request.params;

      await connection('companies').where('company_id',company_id).delete();
      return response.status(201).send();
  }
};