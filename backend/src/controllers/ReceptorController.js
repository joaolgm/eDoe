const Usuario = require('../models/Usuario');
const csv = require('csvtojson');

module.exports = {
    async adicionaReceptor(req, res) {
        const csvFilePath = 'src/base.csv';

        csv().fromFile(csvFilePath).then((json) => {
            console.log(json);
        });
        
        const jsonArray = await csv().fromFile(csvFilePath);

        async function addReceptor(receptor) {
            await Usuario.create({
                id: receptor.id,
                nome: receptor.nome,
                email: receptor.email,
                celular: receptor.celular,
                classe: receptor.classe,
                doador: false
            })
        };

        jsonArray.forEach(addReceptor);

        return res.send(jsonArray);
    },

    async atualizaReceptor(req, res) {
        const csvFilePath = 'src/novos.csv';

        csv().fromFile(csvFilePath).then((json) => {
            console.log(json);
        });
        
        const jsonArray = await csv().fromFile(csvFilePath);

        async function attReceptor(receptor) {
            try {
                const receptorAtualizado = await Usuario.findOneAndUpdate({ id: receptor.id }, receptor, {
                    new: true
                });
                return res.json(receptorAtualizado);
            } catch (err) {
                return res.status(400).json({ error: `Usuário não encontrado: ${receptor.id}` });
            }
        }

        jsonArray.forEach(attReceptor);

        return res.send(jsonArray);
    }
};