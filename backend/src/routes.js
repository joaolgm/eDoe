const express = require('express');
const DoadorController = require('./controllers/DoadorController');
const ReceptorController = require('./controllers/ReceptorController');
const ItemController = require('./controllers/ItemController');
const DoaController = require('./controllers/DoaController');

const routes = express.Router();

routes.get('/usuario/id/:id', DoadorController.pesquisaUsuarioPorId);
routes.get('/usuario/nome/:nome', DoadorController.pesquisaUsuarioPorNome);
routes.get('/item-descritores', ItemController.listaDescritorDeItensParaDoacao);
routes.get('/itens', ItemController.listaItensParaDoacao);
routes.get('/doacao', DoaController.historicoDoacao);
routes.get('/item', DoadorController.exibeItem);

routes.post('/doador', DoadorController.adicionaDoador);
routes.post('/receptor', ReceptorController.adicionaReceptor);
routes.post('/item', DoadorController.adicionaItem);
routes.post('/item-necessario', ReceptorController.adicionaItemNecessario);
routes.post('/matching', ReceptorController.matching);

routes.put('/doador/:id', DoadorController.atualizaDoador);
routes.put('/receptor', ReceptorController.atualizaReceptor);
routes.put('/item-necessario', ReceptorController.atualizaItemNecessario);

routes.delete('/usuario/:id', DoadorController.removeUsuario);
routes.delete('/item', DoadorController.removeItem);
routes.delete('/item-necessario', ReceptorController.removeItemNecessario);
routes.delete('/doacao', DoaController.realizaDoacao);

module.exports = routes;