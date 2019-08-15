const express = require('express');
const DoadorController = require('./controllers/DoadorController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/doador/:usuarioId', DoadorController.pesquisaUsuarioPorId);

routes.post('/doador', DoadorController.adicionaDoador);


routes.post('/item', ItemController.adicionarItem);

module.exports = routes;