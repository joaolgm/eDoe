const Item = require('../models/Item');

module.exports = {

    async listaDescritorDeItensParaDoacao(req, res) {
        var arrayItens = await Item.find();
        var stringFinal = '';

        function printItens(item) {
            return `${item.quantidade} - ${item.descritor} | `;
        };

        var rounds = arrayItens.length;
        for (let index = 0; index < rounds; index++) {
            stringFinal = stringFinal + printItens(arrayItens.shift());
        }
        
        return res.send(stringFinal);
    },

    async listaItensParaDoacao(req, res) {
        var arrayItens = await Item.find();
        var stringFinal = '';

        function printItens(item) {
            return `${item.id} - ${item.descritor}, tags:[${item.tags}], quantidade: ${item.quantidade}, doador: ${item.nomeUsuario}/${item.idUsuario} | `;
        };

        var rounds = arrayItens.length;
        for (let index = 0; index < rounds; index++) {
            stringFinal = stringFinal + printItens(arrayItens.shift());
        }
        
        return res.send(stringFinal);
    },

}