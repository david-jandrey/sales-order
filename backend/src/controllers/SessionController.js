const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const {user, company_id, password} = request.body;

        const users =   await connection('users')
        .join('companies', 'companies.company_id', 'users.company_id')
        .where('user', user)
        .where('password', password)
        .where('companies.company_id', company_id)
        .select(
            'companies.name',
            'users.user_id'
        )
        .first();

        if(!users){
            return response.status(400).json({error: 'ACCESS DENIED'});
        }   
        return response.json(users);
    }
};