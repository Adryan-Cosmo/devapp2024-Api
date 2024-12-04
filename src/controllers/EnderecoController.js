const EnderecoModel = require('../models/EnderecoModel');
const Logger = require('../models/LogModel');

module.exports = {
    addEndereco: async (req, res) => {
        const { usuarioId, endereco, cidade, estado, cep } = req.body;
        let json = { error: '', result: {} };

        try {
            const enderecoId = await EnderecoModel.addEndereco(usuarioId, endereco, cidade, estado, cep);
            await Logger.addLog(usuarioId, 'Endereço', enderecoId, 'Novo Endereço', 'Endereço cadastrado com sucesso');

            json.result = { id: enderecoId, endereco, cidade, estado, cep };
        } catch (error) {
            console.error('Erro ao adicionar endereço:', error);
            json.error = 'Erro interno no servidor.';
        }

        res.json(json);
    },

    updateEndereco: async (req, res) => {
        const { usuarioId, endereco, cidade, estado, cep } = req.body;
        let json = { error: '', result: {} };

        try {
            const enderecoAntigo = await EnderecoModel.findEnderecoByUsuarioId(usuarioId);

            const success = await EnderecoModel.updateEndereco(usuarioId, enderecoAntigo?.endereco || '', endereco, cidade, estado, cep);

            if (success) {
                // Registrar histórico de alterações
                if (enderecoAntigo) {
                    await UsuarioModel.logAlteracoesEndereco(usuarioId, enderecoAtual, { endereco, cidade, estado, cep });
                }
                await Logger.addLog(usuarioId, 'Endereço', usuarioId, 'Atualização de Endereço', 'Endereço atualizado com sucesso');

                json.result = { endereco, cidade, estado, cep };
            } else {
                json.error = 'Não foi possível atualizar o endereço.';
            }
        } catch (error) {
            console.error('Erro ao atualizar endereço:', error);
            json.error = 'Erro interno no servidor.';
        }
        updateOrCreateEndereco: async (req, res) => {
            const { usuarioId, endereco, cidade, estado, cep } = req.body;
            let json = { error: '', result: {} };

            try {
                const success = await EnderecoModel.updateOrCreateEndereco(usuarioId, endereco, cidade, estado, cep);

                if (success) {
                    json.result = 'Endereço atualizado ou criado com sucesso.';
                } else {
                    json.error = 'Não foi possível atualizar ou criar o endereço.';
                }
            } catch (error) {
                console.error('Erro ao atualizar ou criar endereço:', error);
                json.error = 'Erro interno no servidor.';
            }

            res.json(json);
        },
            res.json(json);
    },

    findEndereco: async (req, res) => {
        const { usuarioId } = req.params;
        let json = { error: '', result: {} };

        try {
            const endereco = await EnderecoModel.findEnderecoByUsuarioId(usuarioId);
            if (endereco) {
                json.result = endereco;
            } else {
                // Retorna um resultado vazio sem erro
                json.result = {
                    endereco: '',
                    cidade: '',
                    estado: '',
                    cep: '',
                };
            }
        } catch (error) {
            console.error('Erro ao buscar endereço:', error);
            json.error = 'Erro interno no servidor.';
            res.status(500);
        }

        res.json(json);
    },
    updateOrCreateEndereco: async (req, res) => {
        let json = { error: '', result: {} };
        let usuarioId = req.body.usuarioId;
        let endereco = req.body.endereco;
        let cidade = req.body.cidade;
        let estado = req.body.estado;
        let cep = req.body.cep;
        console.log('🚀 ~ updateOrCreateEndereco: ~ usuarioId:', usuarioId);

        if (!usuarioId) {
            json.error = 'ID do usuário é obrigatório.';
            res.status(400).json(json); // Retorna erro 400 se o ID do usuário estiver ausente
            return;
        }

        try {
            const enderecoAtual = await EnderecoModel.findEnderecoByUsuarioId(usuarioId);

            const success = await EnderecoModel.updateOrCreateEndereco(usuarioId, endereco || '', cidade || '', estado || '', cep || '');

            if (success) {
                if (enderecoAtual) {
                    await EnderecoModel.logAlteracoesEndereco(usuarioId, enderecoAtual, { endereco, cidade, estado, cep });
                }
                json.result = 'Endereço atualizado ou criado com sucesso.';
            } else {
                json.error = 'Não foi possível atualizar ou criar o endereço.';
            }
        } catch (error) {
            console.error('Erro ao atualizar ou criar endereço:', error);
            json.error = 'Erro interno no servidor.';
        }

        res.json(json);
    },
};
