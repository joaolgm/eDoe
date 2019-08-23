const { Schema, model } = require('mongoose');
const Item = require('../models/Item')

const UsuarioSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    celular: {
        type: String,
        required: true,
    },
    classe: {
        type: String,
        required: true,
    },
    doador: {
        type: Boolean,
    },
    itens: [{}],
}, {
    timestamps: true,
});

module.exports = model('Usuario', UsuarioSchema);