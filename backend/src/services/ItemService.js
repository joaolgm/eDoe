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
    
    wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
    },

    async listaItensParaDoacao() {
        var itens = await Item.find();

        //this.wait(3000);

        return itens;
    }
}