const { Schema, model } = require('mongoose');

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
}, {
    timestamps: true,
});

module.exports = model('Usuario', UsuarioSchema);