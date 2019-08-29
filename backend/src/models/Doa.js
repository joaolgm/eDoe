const { Schema, model } = require('mongoose');

const DoaSchema = new Schema({
    doados: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

module.exports = model('Doa', DoaSchema);