const express = require('express');
const DoadorController = require('./controllers/DoadorController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/doador/id/:id', DoadorController.pesquisaUsuarioPorId);
routes.get('/doador/nome/:nome', DoadorController.pesquisaUsuarioPorNome);

routes.post('/doador', DoadorController.adicionaDoador);

routes.put('/doador/atualiza/:id', DoadorController.atualizaUsuario);

routes.delete('/doador/remove/:id', DoadorController.removeUsuario);

routes.post('/item', ItemController.adicionarItem);

module.exports = routes;