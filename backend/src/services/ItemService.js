const Item = require('../models/Item');

module.exports = {
    async listaDescritorDeItensParaDoacao() {
        var arrayItens = await Item.find();
        var stringFinal = '';

        function printItens(item) {
            return `${item.quantidade} - ${item.descritor} | `;
        };
        
        var rounds = arrayItens.length;
        for (var i = 0; i < rounds; i++) {
            if(arrayItens[i].necessario == false) {
                stringFinal = stringFinal + printItens(arrayItens[i]);
            }
        }
        
        return stringFinal;
    },

    async listaItensParaDoacao() {
        var arrayItens = await Item.find();
        var stringFinal = '';

        function printItens(item) {
            return `${item.id} - ${item.descritor}, tags:[${item.tags}], quantidade: ${item.quantidade}, doador: ${item.idUsuario} | `;
        };

        var rounds = arrayItens.length;
        for (let i = 0; i < rounds; i++) {
            if(arrayItens[i].necessario == false) {
                stringFinal = stringFinal + printItens(arrayItens[i]);
            }
        }
        
        return stringFinal;
    }
}