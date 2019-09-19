const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const ObjectId = Schema.Types.ObjectId;

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
    senha: {
        type: String,
        required: true,
        select: false,
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
    itens: [{ 
        type : ObjectId, 
    }],
}, {
    timestamps: true,
});

UsuarioSchema.pre('save', async function(next) {
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
});

module.exports = model('Usuario', UsuarioSchema);