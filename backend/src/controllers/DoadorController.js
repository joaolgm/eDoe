const Util = require('../Util');
const DoadorService = require('../services/DoadorService');

module.exports = {
    async adicionaDoador(req, res) {
        const { id, nome, email, celular, classe } = req.body;

        Util.usuarioVazio(req.body, res); 

        return res.json(await DoadorService.adicionaDoador(id, nome, email,celular, classe));
    },

    async adicionaItem(req, res) {
        const { id, descritor, tags, quantidade, idUsuario } = req.body;
        
        return res.json(await DoadorService.adicionaItem(id, descritor, tags, quantidade, idUsuario));
    },

    async pesquisaUsuarioPorId(req, res) {
        const doc = req.params.id;

        return res.send(await DoadorService.pesquisaUsuarioPorId(doc));
    },

    async exibeItem(req, res) {
        const {idItem, idUsuario} = req.body;

        return res.send(await DoadorService.exibeItem(idItem, idUsuario));
    },

    async atualizaDoador(req, res) {  
        const doc = req.params.id;

        const update = Util.usuarioUpdate(req.body);

        return res.json(await DoadorService.atualizaDoador(doc, update));
    },

    async removeUsuario(req, res) { 
        const doc = req.params.id;

        return res.json(await DoadorService.removeUsuario(doc));
    },

    async removeItem (req, res) {
        const { idItem, idUsuario } = req.body;
        
        return res.json(await DoadorService.removeItem(idItem, idUsuario));
    }
};