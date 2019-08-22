const Item = require('../models/Item');

module.exports = {
    async adicionarItem(req, res) {

        const { id, descritor, tags, quantidade, nomeUsuario, idUsuario } = req.body;

        const item = await Item.create({
            id,
            descritor,
            tags,
            quantidade,
            nomeUsuario,
            idUsuario 
        });

        return res.json(item);
    },

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
        
        console.log(stringFinal);
        return res.send(stringFinal);
    },

    async listaItensParaDoacao(req, res) {
        var arrayItens = await Item.find();
        var stringFinal = '';

        function printItens(item) {
            return `${item.id} - ${item.descritor}, tags:[${item.tags}], quantidade: ${item.quantidade}, doador: ${item.nomeDoador}/${item.idDoador} | `;
        };

        var rounds = arrayItens.length;
        for (let index = 0; index < rounds; index++) {
            stringFinal = stringFinal + printItens(arrayItens.shift());
        }
        
        console.log(stringFinal);
        return res.send(stringFinal);
    }
}