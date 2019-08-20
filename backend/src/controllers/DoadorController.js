const Usuario = require('../models/Usuario');

module.exports = {
    async adicionaDoador(req, res) {
        const { id, nome, email, celular, classe } = req.body;

        if(!id) {
            return res.status(400).json({ error: "Entrada invalida: id do usuario nao pode ser vazio ou nulo." });
        }
        else if(!nome) {
            return res.status(400).json({ error: "Entrada invalida: nome nao pode ser vazio ou nulo." });
        }
        else if(!email) {
            return res.status(400).json({ error: "Entrada invalida: email nao pode ser vazio ou nulo." });
        }
        else if(!celular) {
            return res.status(400).json({ error: "Entrada invalida: celular nao pode ser vazio ou nulo." });
        }
        else if(!classe) {
            return res.status(400).json({ error: "Entrada invalida: classe nao pode ser vazia ou nula." });
        }

        const doadorExiste = await Usuario.findOne({ id: id });

        if(doadorExiste) {
            return res.json(doadorExiste);
        }

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

        if(!id) {
            return res.status(400).json({ error: "Entrada invalida: id do usuario nao pode ser vazio ou nulo." });
        }

        const doadorExiste = await Usuario.findOne({ id: doc });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
        
        var status = (doadorExiste.classe == "pessoa fisica" ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`);
       
    },

    async pesquisaUsuarioPorNome(req, res) {
        const nome = req.params.nome;

        if(!nome) {
            return res.status(400).json({ error: "Entrada invalida: nome nao pode ser vazio ou nulo." });
        }

        const doadorExiste = await Usuario.findOne({ nome: nome });

        if(!doadorExiste) {
            return res.status(400).json({ error: `Usuário não encontrado: ${nome}`});
        }

        var status = (doadorExiste.classe == "pessoa fisica" ? "doador" : "receptor");

        return res.send(`${doadorExiste.nome}/${doadorExiste.id}, ${doadorExiste.email}, ${doadorExiste.celular}, status: {${status}}`);
       
    },

    async atualizaUsuario(req, res) {   //problema para pegar vazio na rota
        const doc = req.params.id;

        if(!doc) {
            return res.status(400).json({ error: "Entrada invalida: id do usuario nao pode ser vazio ou nulo." });
        }

        const update = req.body;

        try {
            const atualizaDoador = await Usuario.findOneAndUpdate({ id: doc }, update, {
                new: true
            });
            return res.json(atualizaDoador);
        } catch (err) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
    },

    async removeUsuario(req, res) {   //problema para pegar vazio na rota
        const doc = req.params.id;

        if(!doc) {
            return res.status(400).json({ error: "Entrada invalida: id do usuario nao pode ser vazio ou nulo." });
        }

        try {
            const removeUsuario = await Usuario.findOneAndDelete({ id: doc });
            return res.json(removeUsuario);
        } catch (err) {
            return res.status(400).json({ error: `Usuário não encontrado: ${doc}` });
        }
    }
};