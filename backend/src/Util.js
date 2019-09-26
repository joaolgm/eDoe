module.exports = {
    usuarioVazio(req, res) {
        const { id, nome, email, senha, celular, classe} = req;

        if(!id || !nome || !email || !senha || !celular || !classe) {
            return res.status(400).json({ error: "Entrada invalida: parametro do usuario nao pode ser vazio ou nulo." });
        }
    },

    usuarioUpdate(objeto) {
        const update = {};

        if (objeto.nome != "") {
            Object.defineProperty(update, "nome", {
                enumerable: true,
                writable: false,
                "value" : objeto.nome});
        };

        if (objeto.email != "") {
            Object.defineProperty(update, "email", {
                enumerable: true,
                writable: false,
                "value" : objeto.email});
        };

        if (objeto.senha != "") {
            Object.defineProperty(update, "senha", {
                enumerable: true,
                writable: false,
                "value" : objeto.senha});
        };

        if (objeto.celular != "") {
            Object.defineProperty(update, "celular", {
                enumerable: true,
                writable: false,
                "value" : objeto.celular});
        };
        
        return update;
    },

    itemUpdate(objeto) {
        const update = {};

        if (objeto.tags != "") {
            Object.defineProperty(update, "tags", {
                enumerable: true,
                writable: false,
                "value" : objeto.tags});
        };

        if (objeto.quantidade != "") {
            Object.defineProperty(update, "quantidade", {
                enumerable: true,
                writable: false,
                "value" : objeto.quantidade});
        };
        
        return update;
    },
};