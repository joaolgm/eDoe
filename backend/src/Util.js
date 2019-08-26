module.exports = {
    checaId(req, res) {
        if(!req) {
            return res.status(400).json({ error: "Entrada invalida: id do usuario nao pode ser vazio ou nulo." });
        }
    },

    checaNome(req, res) {
        if(!req) {
            return res.status(400).json({ error: "Entrada invalida: nome nao pode ser vazio ou nulo." });
        }
    },

    checaEmail(req, res) {
        if(!req) {
            return res.status(400).json({ error: "Entrada invalida: email nao pode ser vazio ou nulo." });
        }
    },

    checaCelular(req, res) {
        if(!req) {
            return res.status(400).json({ error: "Entrada invalida: celular nao pode ser vazio ou nulo." });
        }
    },

    checaClasse(req, res) {
        if(!req) {
            return res.status(400).json({ error: "Entrada invalida: classe nao pode ser vazia ou nula." });
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

        if (objeto.celular != "") {
            Object.defineProperty(update, "celular", {
                enumerable: true,
                writable: false,
                "value" : objeto.celular});
        };
        
        return update;
    }
};