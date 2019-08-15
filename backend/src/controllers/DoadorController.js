const Usuario = require('../models/Usuario');

module.exports = {
    async adicionaDoador(req, res) {
        const doc = req.body;

        const doadorExiste = await Usuario.findOne({ id: doc.id });

        if(doadorExiste) {
            return res.json(doadorExiste);
        }

        const { id, nome, email, celular, classe } = req.body;

        const doador = await Usuario.create({
            id,
            nome,
            email,
            celular,
            classe
        });

        return res.json(doador);
    },

    async pesquisaUsuarioPorId(req, res) {
        const doc = req.params.id;

        const doadorExiste = await Usuario.findOne({ id: doc });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
        
        var status = (doadorExiste.classe == "pessoa fisica" ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`);
       
    },

    async pesquisaUsuarioPorNome(req, res) {
        const nome = req.params.nome;

        const doadorExiste = await Usuario.findOne({ nome: nome });

        if(!doadorExiste) {
            return res.status(400).json({ error: 'Usuário não encontrado: nome'});
        }

        var status = (doadorExiste.classe == "pessoa fisica" ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`);
       
    },

    async atualizaUsuario(req, res) {
        const doc = req.params.id;

        const update = req.body;

        try {
            const atualizaDoador = await Usuario.findOneAndUpdate({ id: doc }, update, {
                new: true
            });
            return res.json(atualizaDoador);
        } catch (err) {
            return res.status(400).json({ error: 'Usuário não encontrado: id' });
        }
    },

    async removeUsuario(req, res) {
        const doc = req.params.id;

        try {
            const removeUsuario = await Usuario.findOneAndDelete({ id: doc });
            return res.json(removeUsuario);
        } catch (err) {
            return res.status(400).json({ error: 'Usuário não encontrado: id' });
        }
    }
};