const Usuario = require('../models/Usuario');
const Item = require('../models/Item');

module.exports = {
    async adicionaDoador(id, nome, email,celular, classe) {
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

    async atualizaDoador(doc, update) {
        try {
            const doadorAtualizado = await Usuario.findOneAndUpdate({ id: doc }, update, {
                new: true
            });
            await doadorAtualizado.save();
            return doadorAtualizado;
        } catch (err) {
            return { error: `Usuário não encontrado: ${doc}` };
        }
    }
}