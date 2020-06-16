const express = require ('express');
const CompanyController = require('./controllers/CompanyController');
const UserController = require('./controllers/UserController');
const ProductController = require('./controllers/ProductController');
const OrderController = require('./controllers/OrderController');
const ProductOrderController = require('./controllers/ProductOrderController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.create); 

routes.post('/companies', CompanyController.create);

routes.post('/users', UserController.create);

routes.post('/products', ProductController.create);

routes.post('/products_orders', ProductOrderController.create);

routes.get('/companies', CompanyController.index);

routes.get('/users', UserController.index);

routes.get('/products', ProductController.index);

routes.get('/orders', OrderController.index);

routes.get('/products_orders', ProductOrderController.index);



routes.delete('/companies/:company_id', CompanyController.delete);

routes.delete('/users/:user_id', UserController.delete);




module.exports = routes;