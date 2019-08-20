const Usuario = require('../models/Usuario');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = {
    async adicionaReceptor(req, res) {
        receptores = [];
        fs.createReadStream(req)
        .pipe(csv())
        .on('data', (row) => {
            receptores.push(row);
            console.log(receptores);
        })
        .on('end', () => {
            console.log('CSV file successfully processed');
        });
    }
};