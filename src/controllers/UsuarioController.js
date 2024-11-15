const UsuarioModel = require('../models/UsuarioModel');

module.exports = {
    logar: async (req, res) => {
        let json = { error: '', result: {} };

        let email = req.body.email;
        let senha = req.body.senha;

        if (email && senha) {
            let user = await UsuarioModel.findUser(email, senha);
            if (user) {
                json.result = user;
            }
        } else {
            json.error = 'Campos em branco!';
        }

        res.json(json);
    },
    all: async (req, res) => {
        let json = { error: '', result: [] };

        let usuarios = await UsuarioModel.getAll();
        for (let i in usuarios) {
            json.result.push({
                id: usuarios[i].id,
                cpf: usuarios[i].cpf,
                nome: usuarios[i].nome,
                email: usuarios[i].email,
                senha: usuarios[i].senha,
                isActive: usuarios[i].isActive,
                role: usuarios[i].role,
            });
        }
        res.json(json);
    },
    one: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let usuario = await UsuarioModel.findById(id);
        if (usuario) {
            json.result = usuario;
        }

        res.json(json);
    },
    new: async (req, res) => {
        let json = { error: '', result: {} };

        let nome = req.body.nome;
        let cpf = req.body.cpf;
        let email = req.body.email;
        let senha = req.body.senha;
        let role = 'normal';
        let isactive = req.body.isActive;
        console.log('chegou aqui');
        if (nome && cpf && email && senha && role) {
            let usuarioId = await UsuarioModel.add(nome, cpf, email, senha, role, isactive);
            json.result = {
                id: usuarioId,
                nome,
                cpf,
                email,
                senha,
                role,
                isactive,
            };
        } else {
            json.error = 'Campos em branco!';
        }

        res.json(json);
    },
};
