const express = require('express');
const apicache = require('apicache');
const authMiddleware = require('./middlewares/auth');
const DoadorController = require('./Usuario/DoadorController');
const ReceptorController = require('./Usuario/ReceptorController');
const ItemController = require('./Item/ItemController');
const DoaController = require('./Doa/DoaController');
const AdminController = require('./Admin/AdminController');
const routes = express.Router();

let cache = apicache.middleware;

routes.get('/usuario', DoadorController.pesquisaUsuarioPorId);   //NoToken
routes.get('/item-descritores', ItemController.listaDescritorDeItensParaDoacao);   //NoToken
routes.get('/itens', cache('1 minute'), ItemController.listaItensParaDoacao);   //NoToken
routes.get('/doacoes', DoaController.historicoDoacao);   //NoToken
routes.get('/item', authMiddleware, DoadorController.exibeItem);

routes.post('/doador', DoadorController.adicionaDoador);   //NoToken
routes.post('/receptor', ReceptorController.adicionaReceptor);   //NoToken
routes.post('/item', authMiddleware,DoadorController.adicionaItem);
routes.post('/item-necessario', ReceptorController.adicionaItemNecessario);   //NoToken
routes.post('/matching', authMiddleware, ReceptorController.matching);
routes.post('/login', cache('1 minute'), DoadorController.loginDoador);   //NoToken
routes.post('/admin/login', AdminController.loginAdmin);
routes.post('/admin', AdminController.adicionaAdmin);

routes.put('/doador', authMiddleware, DoadorController.atualizaDoador);
routes.put('/receptor', ReceptorController.atualizaReceptor);   //NoToken
routes.put('/item-necessario', authMiddleware, ReceptorController.atualizaItemNecessario);

routes.delete('/usuario', authMiddleware, DoadorController.removeUsuario);
routes.delete('/item', authMiddleware, DoadorController.removeItem);
routes.delete('/item-necessario', authMiddleware, ReceptorController.removeItemNecessario);
routes.delete('/doacao', authMiddleware, DoaController.realizaDoacao);
routes.delete('/admin', AdminController.removeAdmin);

module.exports = routes;