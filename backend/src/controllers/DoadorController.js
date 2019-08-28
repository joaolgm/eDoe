const Usuario = require('../models/Usuario');
const Item = require('../models/Item');
const Util = require('../Util');

module.exports = {
    async adicionaDoador(req, res) {
        const { id, nome, email, celular, classe } = req.body;

        Util.checaId(id, res);
        Util.checaNome(nome, res);
        Util.checaEmail(email, res);
        Util.checaCelular(celular, res);
        Util.checaClasse(classe, res);

        const doadorExiste = await Usuario.findOne({ id: id });

        if(doadorExiste) {
            return res.json(doadorExiste);
        }

        const doador = await Usuario.create({
            id,
            nome,
            email,
            celular,
            classe,
            doador: true
        });

        return res.json(doador);
    },

    async adicionaItem(req, res) {

        const { id, descritor, tags, quantidade, nomeUsuario, idUsuario } = req.body;

        const item = await Item.create({
            id,
            descritor,
            tags,
            quantidade,
            nomeUsuario,
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

        Util.checaId(doc, res);

        const doadorExiste = await Usuario.findOne({ id: doc });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
        
        var status = (doadorExiste.doador == true ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`);
       
    },

    async pesquisaUsuarioPorNome(req, res) {
        const nome = req.params.nome;

        Util.checaNome(nome, res);

        const doadorExiste = await Usuario.findOne({ nome: nome });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${nome}`});
        }

        var status = (doadorExiste.doador == true ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}, itens: ${doadorExiste.itens}`);
       
    },

    async atualizaUsuario(req, res) {  
        const doc = req.params.id;

        Util.checaId(doc, res);

        const update = Util.usuarioUpdate(req.body);

        try {
            const doadorAtualizado = await Usuario.findOneAndUpdate({ id: doc }, update, {
                new: true
            });
            doadorAtualizado.save();
            return res.json(doadorAtualizado);
        } catch (err) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
    },

    async removeUsuario(req, res) {   //problema para pegar vazio na rota
        const doc = req.params.id;

        Util.checaId(doc, res);

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
        for (let i = 0; i < usuario.itens.length; i++) { // rproblema em diminuir quantidade
            itemAtual = await Item.findById(usuario.itens[i]);

            if (itemAtual.id == idItem) {
                itemAtual.quantidade > 1 ?  itemAtual.quantidade-- : usuario.itens.splice(i, 1);
                break;
            }
        }
        await itemAtual.save();
        await usuario.save();

        return res.json(usuario.itens);
    }
};