const express = require('express');
const authMiddleware = require('./middlewares/auth');
const DoadorController = require('./controllers/DoadorController');
const ReceptorController = require('./controllers/ReceptorController');
const ItemController = require('./controllers/ItemController');
const DoaController = require('./controllers/DoaController');

const routes = express.Router();

//routes.use(authMiddleware);

routes.get('/usuario', DoadorController.pesquisaUsuarioPorId);   //NoToken
routes.get('/item-descritores', ItemController.listaDescritorDeItensParaDoacao);   //NoToken
routes.get('/itens', ItemController.listaItensParaDoacao);   //NoToken
routes.get('/doacoes', DoaController.historicoDoacao);   //NoToken
routes.get('/item', authMiddleware, DoadorController.exibeItem);

routes.post('/doador', authMiddleware, DoadorController.adicionaDoador);
routes.post('/receptor', ReceptorController.adicionaReceptor);   //NoToken
routes.post('/item', authMiddleware,DoadorController.adicionaItem);
routes.post('/item-necessario', ReceptorController.adicionaItemNecessario);   //NoToken
routes.post('/matching', authMiddleware, ReceptorController.matching);
routes.post('/login', DoadorController.loginDoador);   //NoToken

routes.put('/doador', authMiddleware, DoadorController.atualizaDoador);
routes.put('/receptor', ReceptorController.atualizaReceptor);   //NoToken
routes.put('/item-necessario', authMiddleware, ReceptorController.atualizaItemNecessario);

routes.delete('/usuario', authMiddleware, DoadorController.removeUsuario);
routes.delete('/item', authMiddleware, DoadorController.removeItem);
routes.delete('/item-necessario', authMiddleware, ReceptorController.removeItemNecessario);
routes.delete('/doacao', authMiddleware, DoaController.realizaDoacao);

module.exports = routes;