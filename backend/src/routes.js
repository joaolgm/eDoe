const express = require('express');
const DoadorController = require('./controllers/DoadorController');

const routes = express.Router();

routes.get('/doador/:usuarioId', DoadorController.pesquisaUsuarioPorId);

routes.post('/doador', DoadorController.adicionaDoador);

module.exports = routes;