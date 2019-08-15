const Item = require('../models/Item');

module.exports = {
    async adicionarItem(req, res) {

        const { id, descritor, tags, quantidade } = req.body;

        const item = await Item.create({
            id,
            descritor,
            tags,
            quantidade   
        });

        return res.json(item);
    }
}