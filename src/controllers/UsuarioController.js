const UsuarioModel = require('../models/UsuarioModel');
const Logger = require('../models/LogModel');

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
                dataCadastro: usuarios[i].dataCadastro,
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
        let dataCadastro = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (nome && cpf && email && senha && role) {
            let usuarioId = await UsuarioModel.add(nome, cpf, email, senha, role, isactive, dataCadastro);

            await Logger.addLog(usuarioId, nome, usuarioId, 'Novo Usuário', 'Cadastro realizado');

            json.result = {
                id: usuarioId,
                nome,
                cpf,
                email,
                senha,
                role,
                isactive,
                dataCadastro,
            };
        } else {
            json.error = 'Campos em branco!';
        }

        res.json(json);
    },
    update: async (req, res) => {
        let json = { error: '', result: {} };

        let id = req.params.id;
        let nome = req.body.nome;
        let cpf = req.body.cpf;
        let email = req.body.email;
        let isactive = req.body.isActive;
        let usuario = await UsuarioModel.findById(id);

        if (id && nome && cpf && email !== undefined && usuario) {
            // Registro de histórico com validação adicional
            const camposParaValidar = [
                { campo: 'nome', valorAntigo: usuario.nome, valorNovo: nome },
                { campo: 'cpf', valorAntigo: usuario.cpf, valorNovo: cpf },
                { campo: 'email', valorAntigo: usuario.email, valorNovo: email },
            ];

            for (const { campo, valorAntigo, valorNovo } of camposParaValidar) {
                if (valorAntigo !== valorNovo) {
                    await UsuarioModel.addHistorico(id, campo, valorAntigo, valorNovo, new Date());
                }
            }

            let success = await UsuarioModel.updateById(id, nome, cpf, email, isactive);
            if (success) {
                await Logger.addLog(id, nome, id, 'Atualização de Usuário', 'Dados atualizados');
                json.result = {
                    id,
                    nome,
                    cpf,
                    email,
                    isActive: isactive,
                };
            } else {
                json.error = 'Não foi possível atualizar o usuário.';
            }
        } else {
            json.error = 'Campos em branco!';
        }

        res.json(json);
    },
};
