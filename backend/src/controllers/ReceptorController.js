const Usuario = require('../models/Usuario');
const Item = require('../models/Item');
const Util = require('../Util');
const csv = require('csvtojson');

module.exports = {
    async adicionaReceptor(req, res) {
        const csvFilePath = 'src/base.csv';

        const jsonArray = await csv().fromFile(csvFilePath);

        async function addReceptor(receptor) {
            const receptorExiste = await Usuario.findOne({ id: receptor.id });

            if(receptorExiste) {
                return
            }

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
    },

    async adicionaItemNecessario(req, res) {
        const item = req.body;

        Util.checaId(item.idUsuario, res);

        const usuario = await Usuario.findOne({ id: item.idUsuario });

        usuario.itens.push(item);
        usuario.save();
        return res.json(item);
    },

    async atualizaItemNecessario(req, res) {   // não funciona
        const { tags, quantidade, idItem, idReceptor }  = req.body;

        Util.checaId(idReceptor, res);

        const receptor = await Usuario.findOne({ id: idReceptor });
        
        if(!receptor) {
            return res.status(400).json({ error: `Usuário não encontrado: ${idReceptor}` });
        }

        var i = 0;
        while (true) {
            if (receptor.itens[i].id == idItem) {
                receptor.itens[i].tags = tags;
                receptor.itens[i].quantidade = quantidade;
                break;
            }
            i++;
        }
        
        receptor.save();
        return res.json(receptor.itens[i]);
    },

    async removeItemNecessario(req, res) {
        const { idReceptor, idItem } = req.body;

        Util.checaId(idReceptor, res);

        const receptor = await Usuario.findOne({ id: idReceptor });
        
        if(!receptor) {
            return res.status(400).json({ error: `Usuário não encontrado: ${idReceptor}` });
        }

        var i = 0;
        while (true) {
            if (receptor.itens[i].id == idItem) {
                receptor.itens.splice(i, 1);
                break;
            }
            i++;
        }

        receptor.save()
        return res.json(receptor.itens);
    }
};