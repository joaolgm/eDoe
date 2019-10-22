const Admin = require('../models/Admin'); 

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
    }
};