const express = require('express');
const DoadorController = require('./controllers/DoadorController');
const ReceptorController = require('./controllers/ReceptorController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/doador/id/:id', DoadorController.pesquisaUsuarioPorId);
routes.get('/doador/nome/:nome', DoadorController.pesquisaUsuarioPorNome);
routes.get('/item', ItemController.listaDescritorDeItensParaDoacao);

routes.post('/doador', DoadorController.adicionaDoador);
routes.post('/receptor', ReceptorController.adicionaReceptor);
routes.post('/item', DoadorController.adicionarItem);

routes.put('/doador/:id', DoadorController.atualizaUsuario);
routes.put('/receptor', ReceptorController.atualizaReceptor);

routes.delete('/doador/:id', DoadorController.removeUsuario);
routes.delete('/doador/', DoadorController.removerItem);

module.exports = routes;