const routes = require('express').Router(); // Importando o a função Router do Express
const userController = require('./app/controllers/UserController');
const validatorMid = require('./app/middlewares/validators');
const jwtMid = require('./app/middlewares/jwt');

// Ao invés de usar o APP usa-se o ROUTES

routes.post('/login', userController.auth);
routes.post('/users', validatorMid.userCreateValidator, userController.store);

routes.use(jwtMid);

routes.get('/users', userController.index);
routes.get('/users/:id', userController.show);
routes.delete('/users/:id', userController.destroy);
// routes -> Jwt -> validate -> Controller
routes.put(
  '/users/:id',
  validatorMid.userUpdateValidator,
  userController.update
);

// (EXPORTANDO ARQUIVO ROUTES) - IMPORTANTE
module.exports = routes;
