const Admin = require('./Admin'); 
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {
    async adicionaAdmin(req, res) {
        const { nome, email, senha } = req.body;

        //Util.usuarioVazio(req.body, res); 

        const adminExiste = await Admin.findOne({ email: email });

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

    async loginAdmin(req, res) {
        const { email, senha } = req.body;
        const admin = await Admin.findOne({ email: email }).select('+senha');

        if(!admin) {
            return res.send(`Email não cadastrado: ${email}`);
        }
        
        if(senha != admin.senha) {
            return `Senha inválida`;
        }

        return res.json({
            admin, 
            token: jwt.sign(email, authConfig.secret)
        });
    },

    async removeAdmin(req, res) {
        const email = req.query.email;

        const removeAdmin = await Admin.findOneAndDelete({ email: email });
        await removeAdmin.save();

        return res.json(removeAdmin);
    }

};