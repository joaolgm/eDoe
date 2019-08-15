const Item = require('../models/Item');

module.exports = {
    async adicionarItem(req, res) {

        console.log(req.body);

        const item = await Item.create({
            id,
            descritor,
            tags,
            quantidade   
        });

        return res.json({ ok: true })
    }
}