const connection = require('../database/connection');

module.exports = {
    async index (request, response) {
        const users =   await connection('users').select('*');
 
        return response.json(users);
 },

    async create (request, response){

        const { user, password} = request.body;
        const company_id = request.headers.authorization;
           
      
      await  connection('users').insert({

        user,
        password,
        company_id,
      })
      return response.status(201).json('Saved successfully.');
    },
    async delete (request, response) {
        const {user_id} = request.params;
        const company_id = request.headers.authorization;

        const users = await connection('users')
        .where('user_id', user_id)
        .select('company_id')
        .first();

        if(users.company_id != company_id){
            return response.status(401).json({ error: 'Operation not permitted.'});
        }

        await connection('users').where('user_id',user_id).delete();

        return response.status(201).send();
    }
};