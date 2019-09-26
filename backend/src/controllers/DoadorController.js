const Util = require('../Util');
const Usuario = require('../models/Usuario');
const DoadorService = require('../services/DoadorService');

module.exports = {
    async adicionaDoador(req, res) {
        const { id, nome, email, senha, celular, classe } = req.body;

        Util.usuarioVazio(req.body, res); 

        return res.json(await DoadorService.adicionaDoador(id, nome, email, senha, celular, classe));
    },

    async loginDoador(req, res) {
        const { email, senha } = req.body;

        return res.json(await DoadorService.loginDoador(email, senha)); 
    },

    async adicionaItem(req, res) {
        const { id, descritor, tags, quantidade, idUsuario } = req.body;
        
        return res.json(await DoadorService.adicionaItem(id, descritor, tags, quantidade, idUsuario));
    },

    async pesquisaUsuarioPorId(req, res) {
        const doc = req.query.id;

        return res.send(await DoadorService.pesquisaUsuarioPorId(doc));
    },

    async exibeItem(req, res) {
        const {idItem, idUsuario} = req.body;

        return res.send(await DoadorService.exibeItem(idItem, idUsuario));
    },

    async atualizaDoador(req, res) {  //problema
        const doc = req.query.id;
        console.log(req.body);
        const update = Util.usuarioUpdate(req.body);

        return res.json(await DoadorService.atualizaDoador(doc, update));
    },

    async removeUsuario(req, res) {  //problema
        const doc = req.query.id;
        const removeUsuario = await Usuario.findOne({ id: doc });
        console.log(removeUsuario);
        return res.json(await DoadorService.removeUsuario(doc));
    },

    async removeItem (req, res) {
        const { idItem, idUsuario } = req.body;
        
        return res.json(await DoadorService.removeItem(idItem, idUsuario));
    }
};