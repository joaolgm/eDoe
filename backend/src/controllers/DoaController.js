const DoaService = require('../services/DoaService');
const Item = require('../models/Item');
const Usuario = require('../models/Usuario');

module.exports = {

    async realizaDoacao(req, res) {
        const { idItemNec, idItemDoador, data } = req.body;

        const itemNec = await Item.findOne({ id: idItemNec });
        const itemDoador = await Item.findOne({ id: idItemDoador });
        const receptor = await Usuario.findOne({ id: itemNec.idUsuario });
        const doador = await Usuario.findOne({ id: itemDoador.idUsuario });

        if(itemNec.descritor == itemDoador.descritor) {
            const doacao = await DoaService.realizaDoacao(itemNec, itemDoador, receptor, doador, data);

            return res.send(doacao);
        }

        return res.status(400).json({ err: "doação negada" });
    },

    async historicoDoacao(req, res) {
        const retorno = await DoaService.historicoDoacao();

        return res.send(retorno);
    }
}