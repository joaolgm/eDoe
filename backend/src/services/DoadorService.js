const Usuario = require('../models/Usuario');
const Item = require('../models/Item');

module.exports = {
    async adicionaDoador(id, nome, email,celular, classe) {
        const doadorExiste = await Usuario.findOne({ id: id });

        if(doadorExiste) {
            return doadorExiste;
        }
        const doador = await Usuario.create({
            id,
            nome,
            email,
            celular,
            classe,
            doador: true
        });

        return doador;
    },

    async adicionaItem(id, descritor, tags, quantidade, idUsuario) {
        const item = await Item.create({
            id,
            descritor,
            tags,
            quantidade,
            idUsuario,
            necessario: false
        });
        
        const usuario = await Usuario.findOne({ id: idUsuario });
        usuario.itens.push(await item._id);
        usuario.save();
        return item;
    },

    async pesquisaUsuarioPorId(doc) {
        const doadorExiste = await Usuario.findOne({ id: doc });

        if(!doadorExiste) {
            return `Usuário não encontrado: ${doc}`;
        }
        
        var status = (doadorExiste.doador == true ? "doador" : "receptor");

        return `${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`;
    },

    async pesquisaUsuarioPorNome(nome) {
        const doadorExiste = await Usuario.findOne({ nome: nome });

        if(!doadorExiste) {
            return `Usuário não encontrado: ${nome}`;
        }

        var status = (doadorExiste.doador == true ? "doador" : "receptor");

        return `${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}, itens: ${doadorExiste.itens}`;
    },

    async exibeItem(idItem, idUsuario) {
        const usuario = await Usuario.findOne({ id: idUsuario });
        
        for (let i = 0; i < usuario.itens.length; i++) {
            item = await Item.findById(usuario.itens[i]);
            if (item.id == idItem) {
                return `${item.id} - ${item.descritor}, tags:[${item.tags}], quantidade: ${item.quantidade}, doador: ${item.idUsuario}`;
            }
        }
        
        return `Item não encontrado: ${idItem}`;
    },

    async atualizaDoador(doc, update) {
        const doadorAtualizado = await Usuario.findOneAndUpdate({ id: doc }, update, {
            new: true
        });
        await doadorAtualizado.save();
        return doadorAtualizado;
    },

    async removeUsuario(doc) {
        const removeUsuario = await Usuario.findOneAndDelete({ id: doc });
        await removeUsuario.save();
        return removeUsuario;
    },

    async removeItem(idItem, idUsuario) {
        const usuario = await Usuario.findOne({ id : idUsuario });
        var itemAtual = "";
        var itemRemovido = "Item não encontrado";

        for (let i = 0; i < usuario.itens.length; i++) { 
            itemAtual = await Item.findById(usuario.itens[i]);

            if (itemAtual.id == idItem) {
                usuario.itens.splice(i, 1);
                itemRemovido = itemAtual;
                await Item.findOneAndDelete({ id: itemAtual.id })
                break;
            }
        }
    
        await usuario.save();

        return itemRemovido;
    }
}