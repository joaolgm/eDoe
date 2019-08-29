const Doa = require('../models/Doa');
const Item = require('../models/Item');

module.exports = {
    async realizaDoacao(itemNec, itemDoador, receptor, doador, data) {
        let saida = "";
        if(itemDoador.quantidade > itemNec.quantidade) {
            saida = saida + `${data} - doador: ${doador.nome}/${doador.id}, item: ${itemDoador.descritor}, quantidade: ${itemNec.quantidade}, receptor: ${receptor.nome}/${receptor.id}`;
            itemDoador.quantidade = itemDoador.quantidade - itemNec.quantidade;
            await itemDoador.save();
            await Item.findOneAndDelete({ id: itemNec.id });
        } else if(itemDoador.quantidade < itemNec.quantidade) {
            saida = saida + `${data} - doador: ${doador.nome}/${doador.id}, item: ${itemDoador.descritor}, quantidade: ${itemDoador.quantidade}, receptor: ${receptor.nome}/${receptor.id}`;
            itemNec.quantidade = itemNec.quantidade - itemDoador.quantidade;
            await itemNec.save();
            await Item.findOneAndDelete({ id: itemDoador.id });
        } else {
            saida = saida + `${data} - doador: ${doador.nome}/${doador.id}, item: ${itemDoador.descritor}, quantidade: ${itemNec.quantidade}, receptor: ${receptor.nome}/${receptor.id}`;
            await Item.findOneAndDelete({ id: itemNec.id });
            await Item.findOneAndDelete({ id: itemDoador.id });
        }

        const doa = await Doa.create({
            doados: saida,
            data: data
        });

        return doa;
    },

    async historicoDoacao() {
        var saida = "";
        var doacoes = [];

        doacoes = await Doa.find();
        for (let i = 0; i < doacoes.length; i++) {
            saida = saida + ` ${doacoes[i].doados} |`;            
        }
        return saida;
    }
}