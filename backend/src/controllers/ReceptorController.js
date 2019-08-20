const Usuario = require('../models/Usuario');
const csv = require('csv-parser');
const fs = require('fs');

module.exports = {
    async adicionaReceptor(req, res) {
        // This line opens the file as a readable stream
        const readStream = fs.createReadStream(req.body);

        // This will wait until we know the readable stream is actually valid before piping
        readStream.on('open', function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(res);
        });

        // This catches any errors that happen while creating the readable stream (usually invalid names)
        readStream.on('error', function(err) {
        res.end(err);
        });
    }
};