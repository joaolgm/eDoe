const Usuario = require('../models/Usuario');

module.exports = {
    async adicionaDoador(req, res) {
        const { doc } = req.body;

        const doadorExiste = await Usuario.findOne({ id: doc });

        if(doadorExiste) {
            return res.json(doadorExiste);
        }

        const response = req.body; // de onde pego o dado?

        const { nome, email, celular, classe } = await response.data;

        const doador = await Usuario.create({
            id: doc,
            nome,
            email,
            celular,
            classe
        });

        return res.json(doador);
    },

    async pesquisaUsuarioPorId(req, res) {
        const { doc } = req.params;

        const doadorExiste = await Usuario.findOne({ id: doc });

        if(doadorExiste) {
            return res.json(doadorExiste);
        }
        
        return res.status(400).json({ error: 'Doador não existe' });
    }
};