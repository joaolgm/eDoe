const DoaService = require('./DoaService');
const Item = require('../Item/Item');

module.exports = {

    async realizaDoacao(req, res) {
        const { idItemNec, idItemDoador, data } = req.body;

        const itemNec = await Item.findOne({ id: idItemNec });
        const itemDoador = await Item.findOne({ id: idItemDoador });

        if(itemNec.descritor == itemDoador.descritor) {
            const doacao = await DoaService.realizaDoacao(idItemNec, idItemDoador, data);

            return res.send(doacao);
        }

        return res.status(400).json({ err: "doação negada" });
    },

    async historicoDoacao(req, res) {
        const retorno = await DoaService.historicoDoacao();

        return res.send(retorno);
    }
}