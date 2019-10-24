const ReceptorService = require('./ReceptorService');
const Util = require('../Util');

module.exports = {
    async adicionaReceptor(req, res) {
        const csvFilePath = 'src/base.csv';

        return res.json(await ReceptorService.adicionaReceptor(csvFilePath));
    },

    async atualizaReceptor(req, res) {
        const csvFilePath = 'src/novos.csv';

        return res.send(await ReceptorService.atualizaReceptor(csvFilePath));
    },

    async adicionaItemNecessario(req, res) {
        const { id, descritor, tags, quantidade, idUsuario } = req.body;

        return res.json(await ReceptorService.adicionaItemNecessario(id, descritor, tags, quantidade, idUsuario));
    },

    async atualizaItemNecessario(req, res) {   // não funciona
        const { idItem, idReceptor }  = req.body;

        const update = Util.itemUpdate(req.body);

        return res.json(await ReceptorService.atualizaItemNecessario(idItem, idReceptor, update).itens);
    },

    async removeItemNecessario(req, res) {
        const { idReceptor, idItem } = req.body;

        return res.json(await ReceptorService.removeItemNecessario(idReceptor, idItem).itens);
    },

    async matching(req, res) {   // calcula pontos e ordena, mas as somas tao erradas
        const { idReceptor, idItem } = req.body;

        return res.send(await ReceptorService.matching(idReceptor, idItem));
    }
};