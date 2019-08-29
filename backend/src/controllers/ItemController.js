const ItemService = require('../services/ItemService');

module.exports = {
    async listaDescritorDeItensParaDoacao(req, res) {
        return res.send(await ItemService.listaDescritorDeItensParaDoacao());
    },

    async listaItensParaDoacao(req, res) {
        return res.send(await ItemService.listaItensParaDoacao());
    }
}