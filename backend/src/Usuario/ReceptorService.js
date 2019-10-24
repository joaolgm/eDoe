const Usuario = require('./Usuario');
const Item = require('../Item/Item');
const csv = require('csvtojson');

module.exports = {
    async adicionaReceptor(csvFilePath) {
        async function addReceptor(receptor) {
            const receptorExiste = await Usuario.findOne({ id: receptor.id });

            if(receptorExiste) {
                return
            }

            const recep = await Usuario.create({
                id: receptor.id,
                nome: receptor.nome,
                email: receptor.email,
                senha: receptor.senha,
                celular: receptor.celular,
                classe: receptor.classe,
                doador: false
            })
            recep.senha = undefined;
        };

        const jsonArray = await csv().fromFile(csvFilePath);

        jsonArray.forEach(addReceptor);
        
        return jsonArray;
    },

    async atualizaReceptor(csvFilePath) {
        const jsonArray = await csv().fromFile(csvFilePath);

        async function attReceptor(receptor) {
            try {
                const receptorAtualizado = await Usuario.findOneAndUpdate({ id: receptor.id }, receptor, {
                    new: true
                });
                return receptorAtualizado;
            } catch (err) {
                return `Usuário não encontrado: ${receptor.id}`;
            }
        }

        jsonArray.forEach(attReceptor);

        return jsonArray;
    },

    async adicionaItemNecessario(id, descritor, tags, quantidade, idUsuario) {
        const usuario = await Usuario.findOne({ id: idUsuario });

        const item = await Item.create({
            id,
            descritor,
            tags,
            quantidade,
            idUsuario,
            necessario: true
        });

        usuario.itens.push(await item._id);
        usuario.save();

        return item;
    },

    async atualizaItemNecessario(idItem, idReceptor, update) {
        const receptor = await Usuario.findOne({ id: idReceptor });
        
        if(!receptor) {
            return `Usuário não encontrado: ${idReceptor}`;
        }

        var itemAtual = "";
        var i = 0;
        while (true) {
            itemAtual = await Item.findById(receptor.itens[i]);
            if (itemAtual.id == idItem) {
                itemAtual.tags = update.tags;
                itemAtual.quantidade = update.quantidade;
                break;
            }
            i++;
        }
        
        receptor.save();

        return receptor;
    },

    async removeItemNecessario(idReceptor, idItem) {
        const receptor = await Usuario.findOne({ id: idReceptor });
        
        if(!receptor) {
            return `Usuário não encontrado: ${idReceptor}`;
        }

        var i = 0;
        var itemAtual = "";
        while (true) {
            itemAtual = await Item.findById(receptor.itens[i]);
            if (itemAtual.id == idItem) {
                receptor.itens.splice(i, 1);
                itemRemovido = itemAtual;
                await Item.findOneAndDelete({ id: itemAtual.id })
                break;
            }
            i++;
        }

        receptor.save()

        return receptor;
    },

    async matching(idReceptor, idItem) {
        const itemNecessario = await Item.findOne({ id: idItem });

        var itensPossiveis = [];
        var pontos = [];

        itensPossiveis = await Item.find({ descritor: itemNecessario.descritor,
                                              necessario: false });

        function comparaTags(tagsOriginais, tagsNovas) {
            var parcial = 0;
            for (let i = 0; i < tagsOriginais.length; i++) {
                for (let j = 0; j < tagsNovas.length; j++) {   // j = i+1
                    if(tagsOriginais[i] == tagsNovas[j]) {
                        parcial += 5;
                    }
                }
            }
            return parcial;
        }

        for (let i = 0; i < itensPossiveis.length; i++) {
            
            var complete = 0;
            var parcial = 0;
            
            for (let j = 0; j < itensPossiveis[i].tags.length; j++) {
                if(itensPossiveis[i].tags[j] == itemNecessario.tags[j]) {
                    complete++;
                }                
            }

            if(complete == itensPossiveis[i].tags.length) {
                pontos[i] = { id: itensPossiveis[i].id, pontos: 20+complete*10 };
            } else {
                parcial = comparaTags(itemNecessario.tags, itensPossiveis[i].tags);
                pontos[i] = { id: itensPossiveis[i].id, pontos: 20+parcial*5 };
            }
            
        }

        pontos.sort(function(a, b) {
            return b.pontos - a.pontos;
        });

        async function printaNecessarios(obj) {
            const item = await Item.findOne({ id: obj.id });
            return ` ${item.id} - ${item.descritor}, tags: [${item.tags}], quantidade: ${item.quantidade}, doador: ${item.idUsuario} |`;
            
        }

        var saida = "";
        for (let i = 0; i < pontos.length; i++) {
            saida = saida + await printaNecessarios(pontos[i]);
        }

        return saida;
    }
}