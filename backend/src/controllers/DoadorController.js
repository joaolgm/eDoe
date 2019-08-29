const Usuario = require('../models/Usuario');
const Item = require('../models/Item');
const Util = require('../Util');
const DoadorService = require('../services/DoadorService');

module.exports = {
    async adicionaDoador(req, res) {
        const { id, nome, email, celular, classe } = req.body;

        Util.usuarioVazio(req.body, res);

        const doadorExiste = await Usuario.findOne({ id: id });

        if(doadorExiste) {
            return res.json(doadorExiste);
        }

        const doador = await DoadorService.adicionaDoador(id, nome, email,celular, classe);

        return res.json(doador);
    },

    async adicionaItem(req, res) {

        const { id, descritor, tags, quantidade, idUsuario } = req.body;

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
        return res.json(item);
    },

    async pesquisaUsuarioPorId(req, res) {
        const doc = req.params.id;

        const doadorExiste = await Usuario.findOne({ id: doc });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
        
        var status = (doadorExiste.doador == true ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`);
       
    },

    async pesquisaUsuarioPorNome(req, res) {
        const nome = req.params.nome;

        const doadorExiste = await Usuario.findOne({ nome: nome });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${nome}`});
        }

        var status = (doadorExiste.doador == true ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}, itens: ${doadorExiste.itens}`);
       
    },

    async atualizaDoador(req, res) {  
        const doc = req.params.id;

        const update = Util.usuarioUpdate(req.body);

        return res.json(await DoadorService.atualizaDoador(doc, update));
    },

    async removeUsuario(req, res) {   //problema para pegar vazio na rota
        const doc = req.params.id;

        try {
            const removeUsuario = await Usuario.findOneAndDelete({ id: doc });
            return res.json(removeUsuario);
        } catch (err) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
    },

    async removeItem (req, res) {
        const { idItem, idUsuario } = req.body;
        const usuario = await Usuario.findOne({ id : idUsuario });
        var itemAtual = "";
        var itemRemovido = "Item não encontrado";

        for (let i = 0; i < usuario.itens.length; i++) { 
            itemAtual = await Item.findById(usuario.itens[i]);

            if (itemAtual.id == idItem) {
                usuario.itens.splice(i, 1);
                itemRemovido = itemAtual;
                console.log(itemAtual);
                await Item.findOneAndDelete({ id: itemAtual.id })
                break;
            }
        }
        console.log(itemAtual);
        await usuario.save();

        return res.json(itemRemovido);
    },
    
};