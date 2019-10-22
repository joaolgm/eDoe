const Admin = require('../models/Admin'); 
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    async adicionaAdmin(req, res) {
        const { nome, email, senha} = req.body;

        //Util.usuarioVazio(req.body, res); 

        const adminExiste = await Admin.findOne({ email });

        if(adminExiste) {
            return adminExiste;
        }
        const admin = await Admin.create({
            nome,
            email,
            senha
        });
        admin.senha = undefined;
        
        return res.json(admin);
    },

    async removeAdmin(req, res) {
        const email = req.query.email;

        const removeAdmin = await Admin.findOneAndDelete({ email });
        await removeAdmin.save();

        return res.json(removeAdmin);
    },

    async geraToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400,
        });
    },

    async loginAdmin(req, res) {
        const { email } = req.body;
        const admin = await Admin.findOne({ email });

        if(!admin) {
            return res.send(`Email não cadastrado: ${email}`);
        }

        return res.json( {
            admin, 
            token: this.geraToken({ id: admin.email })
        });
    },

};