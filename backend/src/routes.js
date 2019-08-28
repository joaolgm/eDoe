const express = require('express');
const DoadorController = require('./controllers/DoadorController');
const ReceptorController = require('./controllers/ReceptorController');
const ItemController = require('./controllers/ItemController');

const routes = express.Router();

routes.get('/doador/id/:id', DoadorController.pesquisaUsuarioPorId);
routes.get('/doador/nome/:nome', DoadorController.pesquisaUsuarioPorNome);
routes.get('/item-descritores', ItemController.listaDescritorDeItensParaDoacao);
routes.get('/item', ItemController.listaItensParaDoacao);
routes.get('/matching', ReceptorController.matching);

routes.post('/doador', DoadorController.adicionaDoador);
routes.post('/receptor', ReceptorController.adicionaReceptor);
routes.post('/item', DoadorController.adicionaItem);
routes.post('/item-necessario', ReceptorController.adicionaItemNecessario);

routes.put('/doador/:id', DoadorController.atualizaUsuario);
routes.put('/receptor', ReceptorController.atualizaReceptor);
routes.put('/item-necessario', ReceptorController.atualizaItemNecessario);

routes.delete('/doador/:id', DoadorController.removeUsuario);
routes.delete('/item', DoadorController.removeItem);
routes.delete('/item-necessario', ReceptorController.removeItemNecessario);

module.exports = routes;