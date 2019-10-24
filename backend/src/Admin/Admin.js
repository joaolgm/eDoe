const { Schema, model } = require('mongoose');

const AdminSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true,
});

module.exports = model('Admin', AdminSchema);