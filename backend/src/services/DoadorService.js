const Usuario = require('../models/Usuario');
const Admin = require('../models/Admin');
const Item = require('../models/Item');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

module.exports = {
    async adicionaDoador(id, nome, email, senha, celular, classe, tokenAdmin) {

        try {
            jwt.verify(tokenAdmin, authConfig.secret);
        } catch (error) {
            return { error: "Acesso negado! Token inválido" };
        }

        const adminEmail = jwt.decode(tokenAdmin);
        
        if(adminEmail.id) {
            return { error: "Acesso negado! Acesso restrito para admin" };
        }
        
        const doadorExiste = await Usuario.findOne({ id: id });

        if(doadorExiste) {
            return doadorExiste;
        }
        const doador = await Usuario.create({
            id,
            nome,
            email,
            senha,
            celular,
            classe,
            doador: true
        });
        doador.senha = undefined;
        
        return doador;
    },

    geraToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400,
        });
    },

    async loginDoador(email, senha) {
        const doador = await Usuario.findOne({ email: email }).select('+senha');

        if(!doador) {
            return `Email não cadastrado: ${email}`;
        }

        if(senha != doador.senha) {
            return `Senha inválida`;
        }

        doador.senha = undefined;

        return {
            doador, 
            token: this.geraToken({ id: doador.email })
        };
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
            return { error: `Usuário não encontrado: ${doc}` };
        }

        return doadorExiste;
    },

    async exibeItem(idItem, idUsuario) {
        const usuario = await Usuario.findOne({ id: idUsuario });
        for (let i = 0; i < usuario.itens.length; i++) {
            const item = await Item.findById(usuario.itens[i]);
            if (item.id == idItem) {
                return item;
            }
        }
        
        return { error: `Item não encontrado: ${idItem}` };
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
        var itemRemovido = { error: "Item não encontrado" };

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