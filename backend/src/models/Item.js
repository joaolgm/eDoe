const { Schema, model } = require('mongoose');

const ItemSchema = new Schema({
    id: {
        type: Number,   // Schema.Type.ObjectId
        required: true,
    },
    descritor: {
        type: String,
        required: true,
    },
    tags: [String],
    quantidade: {
        type: Number,
        required: true,
    },
    nomeUsuario: {
        type: String,
        required: true,
    },
    idUsuario: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = model('Item', ItemSchema);