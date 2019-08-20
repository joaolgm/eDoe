const express = require('express');
const DoadorController = require('./controllers/DoadorController');
const ReceptorController = require('./controllers/ReceptorController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/doador/id/:id', DoadorController.pesquisaUsuarioPorId);
routes.get('/doador/nome/:nome', DoadorController.pesquisaUsuarioPorNome);

routes.post('/doador', DoadorController.adicionaDoador);
routes.post('/receptor', ReceptorController.adicionaReceptor);
routes.post('/item', ItemController.adicionarItem);

routes.put('/doador/:id', DoadorController.atualizaUsuario);

routes.delete('/doador/:id', DoadorController.removeUsuario);

module.exports = routes;